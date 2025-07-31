export default function Hero({ user }: { user: any }) {
  return (
    <>
      {user?.user && (
        <div className="widget mx-auto text-center space-y-6 min-h-[calc(65vh)] flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Track Every Game,
            <br />
            Every Player.
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto w-[calc(100%-4rem)]">
            Stay on top of your team’s progress, <br /> performance and stats
            all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/signup" className="main-btn inline-block">
              Create Team
            </a>
            <a href="/login" className="main-btn inline-block">
              Login
            </a>
          </div>
        </div>
      )}
    </>
  );
}
