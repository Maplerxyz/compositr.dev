import CenterBox from "../../components/utility/container/centerbox";

export default function Rules() {
  return (
    <CenterBox>
      <h1 className="text-compositr text-xl font-bold">Image Hosting Rules</h1>
      <div className="text-left mx-4">
        <p>
          Welcome to Compositr&apos;s private image uploading service. You are
          free to upload as many images as you want, but please abide by these
          simple rules, listed below.
        </p>
        <br />
        <ol className="list-decimal">
          <li>
            No CSAM Content - We <i>will</i> send law enforcement to your house.
          </li>
          <li>NSFW is allowed, however remember rule #1!</li>
          <li>Images must be &lt;8MB in size.</li>
          <li>Extreme gore/shock content is not allowed</li>
          <li>
            Malware or harmful images or data is not permitted to be uploaded to
            this service
          </li>
          <li>
            Images encouraging, or showing illegal activities is not allowed
          </li>
          <li>Spam is not allowed</li>
          <li>Keep your API key private. Your API key allows <b>upload and modification</b> under your name!</li>
        </ol>
      </div>
    </CenterBox>
  );
}
