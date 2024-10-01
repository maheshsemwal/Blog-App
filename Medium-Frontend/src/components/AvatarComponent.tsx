import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface userNameProps {
  userName: any
}
const AvatarComponent = ({userName}: userNameProps) => {
  return (
    <Avatar>
      <AvatarImage alt={userName} />
      <AvatarFallback>
        {userName
          .split(" ")
          .map((chunk: any[]) => chunk[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  )
}

export default AvatarComponent
