import VideoExample from "./VideoExample";

const Docs = () => {
  return (
    <div class="container">
      <h1>DOCS</h1>
      <VideoExample
        title="Collat"
        description="At least two kills with one bullet"
        sources={[{ src: "/videos/collat.mp4", type: "video/mp4" }]}
        startTime={0}
        endTime={5}
      ></VideoExample>
      <VideoExample
        title="Kamikaze"
        description="Kill an enemy with a grenade that is dropped on death"
        sources={[{ src: "/videos/kamikaze.mp4", type: "video/mp4" }]}
        startTime={5}
      ></VideoExample>
      <VideoExample
        title="Knife"
        description="GO GO ALI ALI"
        sources={[{ src: "/videos/banana-knife.mp4", type: "video/mp4" }]}
      ></VideoExample>
      <VideoExample
        title="Knife multikill"
        description="Kill three or more enemies with a knife in one round"
        sources={[{ src: "/videos/knife-multikill.mp4", type: "video/mp4" }]}
      ></VideoExample>
      <VideoExample
        title="Noscope"
        description="Does not have to be through a wall, a smoke or to the head"
        sources={[{ src: "/videos/noscope.mp4", type: "video/mp4" }]}
      ></VideoExample>
    </div>
  );
};

export default Docs;
