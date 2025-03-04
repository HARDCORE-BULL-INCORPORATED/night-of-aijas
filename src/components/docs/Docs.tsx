import VideoExample from "./VideoExample";

const Docs = () => {
  return (
    <div class="home-container">
      <h1>DOCS</h1>

      <VideoExample
        title="Collat"
        description="At least two kills with one bullet"
        sources={[{ src: "/videos/collat.mp4", type: "video/mp4" }]}
      ></VideoExample>
    </div>
  );
};

export default Docs;
