import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Button } from '@chakra-ui/react'

function Auth() {
    return (
        <div>
            {/* sign in container */}
            <div className='flex justify-center items-center gap-4 p-24 h-screen'>
                <SignedOut>
                    {/* sign up button */}
                    <Button bgColor={'blue.600'} color={'white'} w={80}>
                        <SignUpButton mode='modal' />
                    </Button>

                    {/* sign in button */}
                    <Button bgColor={'black'} color={'white'} w={80}>
                        <SignInButton mode='modal' />
                    </Button>
                </SignedOut>

                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Auth