export default function Header(){
    return (
        <header className="flex items-center justify-between w-full px-24 py-12">
            <h1 className="text-4xl font-bold">Resume</h1>
            <nav className="flex items-center justify-between">
                <a className="text-xl font-bold" href="/edit-resume">Edit</a>
            </nav>
        </header>
    )
}