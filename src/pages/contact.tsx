import { CheckIcon } from "@heroicons/react/solid";
import { FormEvent, useState } from "react";

const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function Contact() {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return setNotification("Missing email");
    if (!regex.test(email)) return setNotification("Invalid email");
    if (!message) return setNotification("Missing message");
    if (message.length > 3000)
      return setNotification("Message too long (5000 character limit)");
    setNotification("");
    setIsLoading(true);
    const res = await fetch("/api/v1/message", {
      method: "POST",
      body: JSON.stringify({
        email,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) return setTimeout(() => setIsLoading(false), 3000);
    setNotification("Error sending message. Make sure all fields are correct");
    setIsLoading(false);
  };

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="prose prose-white mb-4">
        <h1>Contact Me</h1>
        <p>
          Leave a message in the form below, and I&apos;ll try to get back to
          you as soon as possible!
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="not-prose uppercase font-semibold bg-white/5 p-4 rounded border border-slate-500 text-white"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-white/10 border-0 mt-1 rounded w-full invalid:border invalid:border-red-500 focus:invalid:ring-red-500"
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            min={1}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block">
            Message
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="bg-white/10 border-0 mt-1 rounded w-full"
            name="message"
            id="message"
            placeholder="Hi there..."
            maxLength={3000}
          />
        </div>
        <div className="mb-5">
          <button
            disabled={isLoading}
            role={"form"}
            type="submit"
            className="rounded-full bg-cyan-500 hover:bg-cyan-500/80 shadow-cyan-600/50 disabled:bg-cyan-600/80 shadow-lg transition-colors px-3 py-1 mr-4 inline-block align-middle"
          >
            <CheckIcon className="w-5 h-5 align-middle inline-block" />{" "}
            <span className="inline-block align-middle">Send</span>
          </button>
          <span className="normal-case inline-block align-middle animate-pulse">
            {notification}
          </span>
        </div>
      </form>
    </>
  );
}
