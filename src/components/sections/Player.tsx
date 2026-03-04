'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { ChangeEvent, useRef, useState } from "react";

import Button from "../Button";
import { useNotificationContext } from "@/context/NotificationContext";
import classNames from "classnames";

export default function Player() {
  const baseState = { artist: "", song: "" }
  const t = useTranslations('music.in');
  const { user } = useAuthContext() as { user: any };
  const { createError } = useNotificationContext();
  const [form, setForm] = useState(baseState);
  const [loading, setLoading] = useState(false);

  const a = user.email + 'Name';

  const common = [
    "block w-full rounded-md  py-2 px-3 text-base bg-white text-gray-800",
    "outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400",
    "focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 w-full"
  ];

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const x = { ...form, [event.target.name]: event.target.value }
    setForm(x)
  };

  const script = process.env.NEXT_PUBLIC_GOOGLE_MUSIC_SHEET;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      console.log(formData);
      await sendSuggestion();
    }
  };

  const sendSuggestion = async () => {
    if(!script) {
      return;
    }

    try {
      const res = await fetch(script, {
        method: "POST",
        body: JSON.stringify({ name: a, ...form }),
      });
      const result = await res.json();

      if (result.status === "success") {
        setForm(baseState);
      } else {
        // error
        createError();
      }
    } catch (error) {
      console.error(error);
      createError();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div >
      <h1 className={classNames(
        "text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl",
        "grid justify-content align-items"
      )}
      >
        {t('title')}
      </h1>
      <form className="grid w-full max-w-3xl grid-cols-3 gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t("artist-placeholder")}
          name="artist"
          className={classNames(
            common
          )}
          onChange={handleSearch}
          translate="no"
          required
        />
        <input
          type="text"
          placeholder={t("songTitle-placeholder")}
          name="song"
          className={classNames(
            common
          )}
          onChange={handleSearch}
          translate="no"
          required
        />
        <Button className="bg-white" type="submit" disabled={loading}>
          {loading ? 'loading': t('submit')}
        </Button>
      </form>
    </div>
  )
}
