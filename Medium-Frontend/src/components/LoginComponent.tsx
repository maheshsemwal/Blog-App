import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Icons } from './ui/icons'
import { Input } from './ui/input'
import { Toaster } from './ui/toaster'
import { toast } from './ui/use-toast'
import { BACKEND_URL } from '@/config'
import { loginSchema } from '@maheshsemwal/common'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }
const LoginComponent = ({ className, ...props }: UserAuthFormProps) => {
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token)
            navigate("/")
    }, [])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const navigate = useNavigate();
    const handleSubmit = async () => {
        setIsLoading(true);
        if (!username) {
            setIsLoading(false);
            toast({
                title: "Email or Username Required",
                description: "Please enter your Email or username to continue",
            })
            return;
        }
        if (!password) {
            setIsLoading(false);
            toast({
                title: "Password Required",
                description: "Please enter your password to continue",
            })
            return;
        }

        const loginBody = {
            username: username,
            password: password
        }

        if (!loginSchema.safeParse(loginBody).success) {
            setIsLoading(false);
            toast({
                title: "Invalid Data",
                description: "Please enter valid data to continue",
            })
            return;
        }
        //calling api
        try {

            const res = await axios.post(`${BACKEND_URL}/api/v1/user/login`, loginBody);
            if (res) {
                setIsLoading(false);
                localStorage.setItem("authToken", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/");
                toast({
                    title: "Login Success",
                    description: "You have successfully logged in",
                })
            }
        } catch (err: any) {
            setIsLoading(false);
            console.log(err?.response?.status)
            if (err?.response?.status === 403) {
                toast({
                    title: "Login Failed",
                    description: "Invalid Credentials",
                })
            } else {
                toast({
                    title: "Login Failed",
                    description: `Internal server Error`
                })
            }
        }
}
return (
    <>
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
                Enter your Credentials below to Login into your Account
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
                <Button variant="outline">
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    Github
                </Button>
                <Button variant="outline">
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                </Button>
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input id="email" type="email" placeholder="Email or username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
                {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login</Button>
        </CardFooter>
        <Toaster />
    </>
)
}

export default LoginComponent

