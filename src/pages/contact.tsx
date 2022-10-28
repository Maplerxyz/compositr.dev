import { RiSendPlane2Fill } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FormEvent, useState } from "react";
import ContactCard from "@/common/components/cards/Contact/ContactCard";

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
      <div className="mb-4 prose prose-white">
        <h1>Contact Me</h1>
        <p>
          Leave a message in the form below, and I&apos;ll try to get back to
          you as soon as possible! Not a fan of web messages? Contact me via
          Discord or any of my other socials below 👇 instead.
        </p>
      </div>
      <div className="flex flex-col gap-4 justify-center md:justify-start md:flex-row-reverse">
        <aside className="flex flex-col basis-1/4">
          <ContactCard
            icon={<FaDiscord className="h-8 w-8 text-[#5865F2]" />}
            name={"Compositr#0001"}
          />
          <ContactCard
            icon={<FaTelegramPlane className="h-8 w-8 text-[#2481cc]" />}
            name={"@Compositr"}
            href="https://t.me/Compositr"
          />
          <ContactCard
            icon={<MdMail className="w-8 h-8" />}
            name={"mail@compositr.dev"}
            href="mailto:mail@compositr.dev"
          />
        </aside>
        <form
          onSubmit={onSubmit}
          className="p-4 font-semibold text-white uppercase rounded border not-prose bg-white/5 border-nord1 basis-3/4"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mt-1 w-full rounded border-0 bg-white/10 invalid:border invalid:border-red-500 focus:invalid:ring-red-500 focus:ring-compositr"
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
              className="mt-1 w-full rounded border-0 bg-white/10 focus:ring-compositr"
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
              className="inline-block px-3 py-1 mr-4 align-middle rounded-full shadow-lg transition-colors bg-compositr hover:bg-compositr/80 shadow-compositr/50 group disabled:bg-compositr/80"
            >
              <AiOutlineLoading className="hidden w-5 h-5 align-middle animate-spin group-disabled:inline-block" />
              <RiSendPlane2Fill className="inline-block w-5 h-5 align-middle group-disabled:hidden" />{" "}
              <span className="inline-block align-middle">Send</span>
            </button>
            <span className="inline-block normal-case align-middle animate-pulse">
              {notification}
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
