
export default function VerificationSent() {
    return (
        <div className="flex h-3/2 min-h-100 w-1/4 min-w-96 flex-col rounded bg-white p-8">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Verification email sent!</h1>
                <p className="text-sm mt-2 text-center">
                    Please check your email to verify your account.
                </p>
            </div>
        </div>
    )
}