import Skeleton from "./Skeleton.jsx";
import "./DashboardSkeleton.css";

export default function DashboardSkeleton() {
  return (
    <section className="dashboard-skeleton">
      {/* Header */}
      <div className="dashboard-skeleton__header">
        <Skeleton className="skeleton--title" width="200px" />
        <Skeleton width="300px" height="1rem" />
      </div>

      {/* Share Button */}
      <div className="dashboard-skeleton__share">
        <Skeleton className="skeleton--button" width="120px" />
      </div>

      {/* Stats Cards */}
      <div className="dashboard-skeleton__stats">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="dashboard-skeleton__stat-card">
            <div className="dashboard-skeleton__stat-icon">
              <Skeleton className="skeleton--avatar" />
            </div>
            <div className="dashboard-skeleton__stat-content">
              <Skeleton width="80px" height="0.8rem" />
              <Skeleton className="skeleton--title" width="120px" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="dashboard-skeleton__charts">
        <div className="dashboard-skeleton__chart-row">
          <div className="dashboard-skeleton__chart">
            <Skeleton className="skeleton--title" width="150px" />
            <Skeleton className="skeleton--chart" />
          </div>
          <div className="dashboard-skeleton__chart">
            <Skeleton className="skeleton--title" width="180px" />
            <Skeleton className="skeleton--chart" />
          </div>
        </div>

        <div className="dashboard-skeleton__chart-row">
          <div className="dashboard-skeleton__chart dashboard-skeleton__chart--full">
            <Skeleton className="skeleton--title" width="200px" />
            <Skeleton className="skeleton--chart" height="16rem" />
          </div>
        </div>
      </div>
    </section>
  );
}