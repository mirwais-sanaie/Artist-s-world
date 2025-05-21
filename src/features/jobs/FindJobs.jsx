const FindJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "3D Character Artist",
      description:
        "Looking for a talented 3D character artist to create high-quality models for our upcoming game. Experience with ZBrush and Blender is a plus.",
    },
    {
      id: 2,
      title: "Concept Artist",
      description:
        "Seeking a skilled concept artist to design characters and environments for our new project. Strong portfolio required.",
    },
    {
      id: 3,
      title: "Game Designer",
      description:
        "We are looking for a game designer with experience in level design and gameplay mechanics. Must be familiar with Unity or Unreal Engine.",
    },
  ];
  return (
    <div className="bg-primary dark:bg-zinc-900 p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Posted Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No jobs have been posted yet.
        </p>
      ) : (
        <div className="space-y-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-myPurple/20 rounded-xl p-5 bg-color-card"
            >
              <h3 className="text-2xl font-semibold text-white mb-2">
                {job.title}
              </h3>
              <p className="text-white dark:text-gray-300 text-sm leading-relaxed line-clamp-4">
                {job.description}
              </p>
              <div className="text-right mt-4">
                <span className="text-xs text-myGray-muted italic">
                  Posted just now
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindJobs;
