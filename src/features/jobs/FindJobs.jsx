import Spinner from "@/ui/Spinner";
import { useJobs } from "./useJobs";

function FindJobs() {
  const { jobs, error, isLoading } = useJobs();

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="bg-red-500 text-white p-4 rounded-lg">
        <p>Error fetching jobs: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-primary p-6 rounded-2xl shadow-xl w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Posted Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-myGray-muted">
          No jobs have been posted yet.
        </p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-myPurple/30 rounded-2xl bg-color-card p-6 text-myGray shadow-md"
            >
              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {job.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/80 mb-4 line-clamp-5">
                {job.description}
              </p>

              {/* Job Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-myPurple">Location:</span>{" "}
                  {job.location || "—"}
                </div>
                <div>
                  <span className="font-semibold text-myPurple">Type:</span>{" "}
                  {job.jobType || "—"}
                </div>
                <div>
                  <span className="font-semibold text-myPurple">
                    Experience:
                  </span>{" "}
                  {job.experience ? `${job.experience} yrs` : "—"}
                </div>
                <div>
                  <span className="font-semibold text-myPurple">Email:</span>{" "}
                  {job.email || "—"}
                </div>
                <div>
                  <span className="font-semibold text-myPurple">Phone:</span>{" "}
                  {job.phone || "—"}
                </div>
              </div>

              {/* Date Posted */}
              <div className="text-right mt-4">
                <span className="text-xs text-myGray-muted italic">
                  Posted on: {new Date(job.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FindJobs;
