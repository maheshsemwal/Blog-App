import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"
import { signupSchema } from "@maheshsemwal/common"
import { Toaster } from './ui/toaster'
import { toast } from './ui/use-toast'
import axios from 'axios'
import { BACKEND_URL } from '@/config'
import { useNavigate } from 'react-router-dom';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }
const SignupComponent = ({ className, ...props }: UserAuthFormProps) => {

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if(token)
            navigate("/")
    }, [])
    
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [step, setStep] = React.useState<number>(1)
    const [username, setUsername] = React.useState<string>("")
    const [userExists, setUserExists] = React.useState<boolean>(false)
    const [password, setPassword] = React.useState<string>("")
    const [ConfirmPassword, setConfirmPassword] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [name, setName] = React.useState<string>("")
    const confirmPasswordRef = React.useRef<HTMLInputElement>(null)
    const passwordRef = React.useRef<HTMLInputElement>(null)
    const usernameRef = React.useRef<HTMLInputElement>(null)
    const navigate = useNavigate()




    const validPassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;
        return regex.test(password);
    }
    const validUsername = (username: string) => {
        //username can't have spaces and capital letter can't start with a symbol or number but can start with underscore
        const regex = /^[_a-z][a-z0-9_]{2,15}$/;
        return regex.test(username);
    }
    const checkUserExists = async (username: string) => {
        // check if username exists
        try{
            const res = await axios.get(`${BACKEND_URL}/api/v1/user/checkUser?username=${username}`);
            return res.data === "User already exist";
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
            })
            console.log(error);
            return false;
        }
    }
    // const checkEmailExists = (email: string) => {
    //     // check if username exists
    //     const emails = ["mahesh@gmail.com", "maheshsemwal@gmail.com", "maheshsemwal123@gmail.com"];
    //     return emails.includes(email);
    // }

    const checkPassword = (password: string, confirmPassword: string) => {
        return password === confirmPassword;
    }

    useEffect(()=> {
        // check if username exists with debounce
        async function debounce(){

            let timer;
            clearTimeout(timer);
            timer = setTimeout(async () => {
                const userExists = await checkUserExists(username);
                setUserExists(userExists);
            }, 500);
        }

        debounce();
    }, [username])

    useEffect(()=> {
        // check if username exists with debounce
        async function debounce(){

            let timer;
            clearTimeout(timer);
            timer = setTimeout(async () => {
                const user = await checkUserExists(email);
                setUserExists(user);
            }, 500);
        }

        debounce();
    }, [email])

    async function handleSubmit() {
        setIsLoading(true)
        if (step === 1) {
            if (email === "") {
                setIsLoading(false)
                toast({
                    title: "Email Required",
                    description: "Please enter your email",
                })
                return;
            }
            if (userExists) {
                setIsLoading(false)
                toast({
                    title: "Email Already Exists",
                    description: "Please try with another email",
                })
                return;

            }

            setStep(2);
            setIsLoading(false)
        } else if (step == 2) {
            if (!name || !username || !password || !ConfirmPassword) {
                setIsLoading(false)
                toast({
                    title: "All fields are required",
                    description: "Please fill all the fields",
                })
                return;
            }
            if (!validUsername(username)) {
                setIsLoading(false)
                toast({
                    title: "Invalid Username",
                    description: "Username must be between 3 and 16 characters, start with a letter or underscore, and contain only letters, numbers, and underscores"
                });
                return;
            }
            if (userExists) {
                setIsLoading(false)
                toast({
                    title: "Username Already Exists",
                    description: "Please try with another username",
                })
                return;
            }

            if (!validPassword(password)) {
                setIsLoading(false)
                toast({
                    title: "Invalid Password",
                    description: "Password must be at least 7 characters long and contain at least one uppercase letter, one number, and one special character"
                });
                return;
            }

            if (!checkPassword(password, ConfirmPassword)) {
                setIsLoading(false)
                toast({
                    title: "Passwords do not match",
                    description: "Please make sure both passwords match",
                })
                return;
            }

            const signupBody = {
                email: email,
                name: name,
                username: username,
                password: password
            }

            if (!signupSchema.safeParse(signupBody).success) {
                setIsLoading(false)
                toast({
                    title: "Invalid Data",
                    description: "Please enter valid data",
                })
                return;
            }

            // Call API to create account
            console.log(signupBody)
            try {
                setIsLoading(true)
                // Call API to create account
                const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupBody)
                const authToken = res.data.token;
                localStorage.setItem("authToken", authToken);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setIsLoading(false)
                navigate("/");
                toast({
                    title: "Account Created",
                    description: "Your account has been created successfully",
                })


            } catch (e: any) {
                setIsLoading(false)
                toast({
                    title: "Error",
                    description: `${e.response.data.message}` || "Something went wrong",
                })
            }

        }
    }

    return (
        <>
            <div className='text-2xl font-bold mb-2'>
                Create an Account
            </div>
            <div className=' text-gray-500 mb-8'>
                Enter your details below to create your account
            </div>
            <div className={cn("grid gap-6", className)} {...props}>

                <div className="grid gap-2">
                    {step === 1 && (
                        <>
                            <div className="grid gap-1">
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                {userExists && (email !== "") && (
                                    <div className="text-red-500 text-sm">Email already exists</div>
                                )}
                            </div>
                            <Button disabled={isLoading} onClick={handleSubmit} type='submit'>
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Sign In with Email
                            </Button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="grid gap-1">
                                <label htmlFor="name" className="sr-only">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    placeholder="Name"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="name"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-1">
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    type="text"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    onChange={(e) => setUsername(e.target.value)}
                                    ref={usernameRef}
                                    required
                                />
                            </div>
                            <div>
                                {userExists && (usernameRef.current?.value !== "") && (
                                    <div className="text-red-500 text-sm">Username already exists</div>
                                )}
                                {!validUsername(username) && (usernameRef.current?.value !== "") && (
                                    <div className="text-red-500 text-sm">
                                        Invalid username: must be between 3 and 16 characters, start with a letter or underscore, and contain only letters, numbers, and underscores
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-1">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    type="password"
                                    autoCapitalize="none"
                                    autoComplete="current-password"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    onChange={(e) => setPassword(e.target.value)}
                                    ref={passwordRef}
                                    required
                                />
                            </div>
                            <div>
                                {(passwordRef.current?.value !== '') && !validPassword(password) && (
                                    <div className="text-red-500 text-sm">
                                        Password must be at least 7 characters long and contain at least one uppercase letter, one number, and one special character
                                    </div>)}
                            </div>
                            <div className="grid gap-1">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <Input
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    type="password"
                                    autoCapitalize="none"
                                    autoComplete="current-password"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    ref={confirmPasswordRef}
                                    required
                                />
                            </div>
                            <div>
                                {!checkPassword(password, ConfirmPassword) && (confirmPasswordRef.current?.value !== "") && (
                                    <div className="text-red-500 text-sm">Passwords do not match</div>
                                )}
                            </div>
                            <Button disabled={isLoading} onClick={handleSubmit}>
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Create Account
                            </Button>
                        </>
                    )}
                </div>
                {step === 1 && (
                    <>
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
                        <Button variant="outline" type="button" disabled={isLoading}>
                            {isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.gitHub className="mr-2 h-4 w-4" />
                            )}{" "}
                            GitHub
                        </Button>
                    </>
                )}
            </div>
            <Toaster />
        </>
    )
}

export default SignupComponent
