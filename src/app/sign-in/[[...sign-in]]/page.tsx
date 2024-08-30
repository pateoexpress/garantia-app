import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <main className="flex justify-center p-32 md:p-16">
      <SignIn appearance={{
        elements: {
          footerAction: "hidden"
        }
      }} path="/sign-in" />
    </main>
  )
}
