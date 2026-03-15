'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { ChangeEvent, useEffect, useState } from "react";
import Button, { ButtonFocus } from "../Button";
import { useNotificationContext } from "@/context/NotificationContext";
import classNames from "classnames";
import { useSearchContext } from "@/context/SearchContext";
import Input from "../Input";
import sendToSheet, { Submission } from "../../google/sheet";

type SubmissionPartial = Omit<Submission, 'name'>;

type ShortFormStored = {
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
  const [suggestions, setSuggestion] = useState<ShortFormStored[]>([]);

  useEffect(() => {
    const storedSuggestions = localStorage.getItem(user.uid);
    try {
      const stored = storedSuggestions && JSON.parse(storedSuggestions);
      const checked = stored && stored.filter(
        (potential: ShortFormStored) => (potential.a && potential.s) && {
          a: potential.a,
          s: potential.s,
        },
      ) as ShortFormStored[];
      checked && setSuggestion(checked);
    } catch (error) {
      console.log(error);
    }
  }, [user.uid]);

  const storeSuggestion = (form: SubmissionPartial) => {
    const update = [...suggestions, {a: form.artist, s: form.song}];
    setSuggestion(update);
    localStorage.setItem(user.uid, JSON.stringify(update));
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const formData = { ...form, [event.target.name]: event.target.value }
    setForm(formData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    if (event.target instanceof HTMLFormElement) {
      await sendSuggestion();
    }
  };

  const sendSuggestion = async () => {
    const { error } = await sendToSheet({
      name: `${firstName || 'unknown'} / ${user.email}`,
      ...form
    });

    if (error) {
      // error
      console.log(error);
      createError();
      setLoading(false);
      return;
    };

    storeSuggestion(form);
    setForm(baseState);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl sm:mx-auto px-4 sm:px-0">
      <div className="pb-4 text-center">
        <a
          className={classNames(
            'px-3 py-2 rounded-full text-sm text-winter-lighter font-semibold',
            "border-2 border-solid",
            ButtonFocus,
            "hover:text-white/75 hover:bg-winter-lighter/25"
          )}
          href="https://open.spotify.com/playlist/7eGn7rOQOXVbIwIELkjYnj?si=f8137f118e4b4eef"
          target="_blank"
        >
        {t('spotifyLink')}</a>
      </div>
      <h1 className={classNames(
        "allison text-5xl font-semibold text-balance text-white sm:text-6xl",
        "grid justify-content align-items"
      )}
      >
        {t('title')}
      </h1>
      <form
        className="grid w-full max-w-3xl grid-cols-1 sm:grid-cols-3 gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder={t("artist-placeholder")}
          name="artist"
          onChange={handleInput}
          translate="no"
          autoComplete="off"
          value={form.artist}
          required
        />
        <Input
          type="text"
          placeholder={t("songTitle-placeholder")}
          name="song"
          onChange={handleInput}
          translate="no"
          autoComplete="off"
          value={form.song}
          required
        />
        <Button
          className={classNames(
            "bg-winter-lighter hover:bg-winter-lighter/75"
          )}
          type="submit"
          disabled={loading}
         >
          {loading ? 'loading': t('submit')}
        </Button>
      </form>
      <section className={classNames(
        "text-white mt-4",
      )}>
        <ul className="list-inside">
          {suggestions.map((suggestion, i) => <li key={i} className="list-decimal">
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
