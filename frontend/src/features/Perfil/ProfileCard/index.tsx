type profileCardProps = {
  children: React.ReactNode
}

export function ProfileCard({children}: profileCardProps) {
  return (
    <section className="text-gray-200 rounded-2xl">
      <div className="flex flex-col gap-8 bg-[#263243] p-5 rounded-2xl">
        {children}
      </div>
    </section>
  );
}
