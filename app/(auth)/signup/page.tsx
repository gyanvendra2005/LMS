"use client";

// 0YKhrwUq6I4cLcyk
// mongodb+srv://gyanvendras2004:0YKhrwUq6I4cLcyk@cluster0.eb5d9sf.mongodb.net/

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { toast } from "@/components/ui/use-toast";

import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import {toast} from "@/components/ui/sonner";


export default function AuthTabs() {


   const[loginInput, setLoginInput] = useState({email: "", password: ""});
   const[signupInput, setSignupInput] = useState({name: "", email: "", password: ""});
     const { data: session } = useSession();


   const router = useRouter();


    
   // Handle input changes for login and signup forms

   const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput(prev => ({ ...prev, [name]: value }));
   }
    const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     setSignupInput(prev => ({ ...prev, [name]: value }));
    }
    console.log("Login Input:", loginInput);
    console.log("Signup Input:", signupInput);
    console.log("Session Data:", session);
    





    // signin process
    const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Add login logic here
         const response =  await signIn
         ('credentials',{
            redirect:false,
            email:  loginInput.email,
            password: loginInput.password
        })
        if(response?.error){
           console.log("error");
           
        }
        else{
            console.log("login");
            
        }
        if(response?.url){
            // router.replace('/dashboad');
        }

      console.log(response);
      console.log("Logging in with:", loginInput);
    };



    // sign up process
    const handleSignupSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Add signup logic here
       try {
          console.log("Signing up with:", signupInput);
          const response = await axios.post('/api/signup', signupInput);
          // if(response.data.success){
          //   router.replace(`/signin`)
          // }
        } catch (error) {
          console.log("Error in sign up of user",error);

      console.log("Signing up with:", signupInput);
    };
  }



  return (
    <div className="flex w-full h-screen items-center justify-center bg-gray-50">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="signin">Login</TabsTrigger>
        </TabsList>

        {/* Signup Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign-Up</CardTitle>
              <CardDescription>
                Welcome to our platform! Please fill in your details to create an account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" 
                  onChange={handleSignupChange}
                  placeholder="Eg. Gyanvendra Singh" 
                  required 
                  name="name"
                  value={signupInput.name}
                  />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" 
                  onChange={handleSignupChange} 
                  placeholder="Eg. gyani0007@gmail.com" 
                  required 
                  name="email"
                  value={signupInput.email}
                  />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" 
                onChange={handleSignupChange} 
                placeholder="Eg. xyz" 
                required 
                name="password"
                value={signupInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSignupSubmit}>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Signin Tab */}
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign-In</CardTitle>
              <CardDescription>
                Welcome back! Please enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="signin-email">Email</Label>
                <Input id="signin-email" 
                  onChange={handleLoginChange} 
                  type="email" 
                  placeholder="Eg. gyani0007@gmail.com" 
                  required 
                  name="email"
                  value={loginInput.email}
                  />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="signin-password">Password</Label>
                <Input id="signin-password" 
                  onChange={handleLoginChange}  
                  type="password" 
                  placeholder="Eg. xyz" 
                  required 
                  name="password"
                  value={loginInput.password}
                  />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleLoginSubmit}>Signin</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

