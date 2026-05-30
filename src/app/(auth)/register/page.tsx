"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { toast } from "sonner"

import { auth, db } from "@/lib/firebase/client"
import { createSession } from "@/features/auth/actions/auth-actions"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function createUserDocument(user: any, name: string) {
    const userRef = doc(db, "users", user.uid)
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: name,
      tier: "free",
      createdAt: new Date().toISOString(),
      limits: {
        videosRemaining: 3,
        resetDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      }
    }, { merge: true })
  }

  async function handleToken(user: any) {
    // const token = await user.getIdToken()
    // const result = await createSession(token)
    // if (result.success) {
    //   router.push("/create")
    // } else {
    //   toast.error(result.error || "Failed to create session")
    //   setIsLoading(false)
    // }
    router.push("/create")
  }

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
      await createUserDocument(userCredential.user, values.name)
      await handleToken(userCredential.user)
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error.message || "Failed to create account")
    }
  }

  async function onGoogleSignIn() {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      await createUserDocument(userCredential.user, userCredential.user.displayName || "User")
      await handleToken(userCredential.user)
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error.message || "Failed to sign up with Google")
    }
  }

  return (
    <Card className="border-0 shadow-none lg:border lg:shadow-sm w-full bg-transparent lg:bg-card">
      <CardHeader className="space-y-1 text-center pb-8 lg:text-left lg:pb-6">
        <CardTitle className="text-3xl font-bold tracking-tight">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" type="email" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2" size="lg" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background lg:bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full" size="lg" onClick={onGoogleSignIn} disabled={isLoading}>
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-center gap-2 border-t-0 bg-transparent text-sm text-muted-foreground pt-4 pb-2">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  )
}
