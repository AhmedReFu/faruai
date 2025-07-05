"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

/**
 * Renders the main authentication interface, allowing users to sign up, sign in, or sign out.
 *
 * Displays a user creation form when no user is logged in, and shows the current user's information with a sign-out option when authenticated.
 *
 * @returns The authentication UI as a React element.
 */
export default function Home() {
const {data:session}=authClient.useSession()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const onSubmit = () => {
    authClient.signUp.email({
      email,name,password
    }, {
      onError: () => {
        window.alert("Something went wrong")
      },
      onSuccess: () => {
        window.alert("Success")
      }
    })
  }

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={()=>authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} />
      <Input 
      placeholder="email"
      value={email} 
      onChange={(e)=> setEmail(e.target.value)}/>
      <Input 
      placeholder="password" 
      type="password"
      value={password} 
        onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Create User</Button> 
       
    </div>
  )
}