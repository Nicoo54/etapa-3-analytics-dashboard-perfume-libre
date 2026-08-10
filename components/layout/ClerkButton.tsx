import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";

export default function ClerkButton({ expanded }: { expanded: boolean }) {
  const { user } = useUser();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-full flex items-center rounded-lg whitespace-nowrap text-muted-foreground transition-colors ${
        expanded ? "hover:bg-muted hover:text-foreground" : ""
      }`}
    >
      <ClerkLoading>
        <div className="w-10 h-10 flex items-center justify-center rounded-lg shrink-0">
          <div className="w-7 h-7 rounded-full bg-muted-foreground/20 animate-pulse" />
        </div>
        <span
          className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${
            expanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="h-4 w-28 rounded bg-muted-foreground/20 animate-pulse" />
        </span>
      </ClerkLoading>

      <ClerkLoaded>
        <div className="w-10 h-10 flex items-center justify-center rounded-lg shrink-0">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-7 h-7",
              },
            }}
          />
        </div>

        <span
          className={`text-sm font-medium whitespace-nowrap truncate transition-opacity duration-300 ${
            expanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {user?.fullName ||
            user?.primaryEmailAddress?.emailAddress ||
            "Mi Perfil"}
        </span>
      </ClerkLoaded>
    </div>
  );
}
