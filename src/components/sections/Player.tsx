'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../Button";
import { useNotificationContext } from "@/context/NotificationContext";
import classNames from "classnames";
import { useSearchContext } from "@/context/SearchContext";

type Submission = {
  artist: string;
  song: string;
};

type Stored = {
  a: string;
  s: string;
};

export default function Player() {
  const baseState = { artist: "", song: "" };
  const t = useTranslations('music.in');
  const { user } = useAuthContext() as { user: any };
  const { firstName } = useSearchContext();
  const { createError } = useNotificationContext();
  const [form, setForm] = useState(baseState);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestion] = useState<Stored[]>([]);

  useEffect(() => {
    const storedSuggestions = localStorage.getItem(user.uid);
    try {
      const stored = storedSuggestions && JSON.parse(storedSuggestions);
      const checked = stored && stored.filter(
        (potential: Stored) => (potential.a && potential.s) && { a: potential.a, s: potential.s },
      ) as Stored[];
      checked && setSuggestion(checked);
    } catch (error) {
      console.log(error);
    }
  }, [user.uid]);

  const submitter = `${firstName || 'unknown'} / ${user.email}`;

  const common = [
    "block w-full rounded-md  py-2 px-3 text-base bg-white text-gray-800",
    "outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400",
    "focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 w-full"
  ];

  const storeSuggestion = (form: Submission) => {
    const update = [...suggestions, {a: form.artist, s: form.song}];
    setSuggestion(update);
    localStorage.setItem(user.uid, JSON.stringify(update));
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const formData = { ...form, [event.target.name]: event.target.value }
    setForm(formData);
  };

  const script = process.env.NEXT_PUBLIC_GOOGLE_MUSIC_SHEET;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    if (event.target instanceof HTMLFormElement) {
      // const formData = new FormData(event.target);
      // console.log(formData);
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
        body: JSON.stringify({ name: submitter, ...form }),
      });
      const result = await res.json();

      if (result.status === "success") {
        storeSuggestion(form);
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
        "allison text-4xl font-semibold text-balance text-white sm:text-6xl",
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
          onChange={handleInput}
          translate="no"
          autoComplete="off"
          required
        />
        <input
          type="text"
          placeholder={t("songTitle-placeholder")}
          name="song"
          className={classNames(
            common
          )}
          onChange={handleInput}
          translate="no"
          autoComplete="off"
          required
        />
        <Button className="bg-white" type="submit" disabled={loading}>
          {loading ? 'loading': t('submit')}
        </Button>
      </form>
      <section className={classNames(
        "text-white mt-4",
      )}>
        <ul className="list-inside">
          {suggestions.map((suggestion) => <li className="list-decimal">
            {t.rich('listing', {
              song: suggestion.s,
              artist: suggestion.a
            })}
          </li>)}
        </ul>
      </section>
    </div>
  )
}
