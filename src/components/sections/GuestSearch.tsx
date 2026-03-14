'use client'

import { ChangeEvent, FC, useMemo, useState } from 'react';
import { GuestList } from './GuestList';
import { useTranslations } from 'next-intl';
import { GuestDataVariable, useSearchContext } from '@/context/SearchContext';
import classNames from 'classnames';
import Input from '../Input';

export const GuestSearch: FC = () => {
  const t = useTranslations('guest');
  const { guests } = useSearchContext();
  const [search, setSearch] = useState<string | undefined>();

  const filterGuests = useMemo(
    () => (guests && guests.filter((person) => {
      return search && person.participation !== 1 && (
        person.first.toLowerCase().includes(search.toLowerCase())
        || person.surname.toLowerCase().includes(search.toLowerCase())
        || person.alt.toLowerCase().includes(search.toLowerCase())
      )
    })) as GuestDataVariable,
    [search],
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 2) {
      setSearch(event.target.value);
    } else {
      setSearch(undefined);
    }
  };

  return (
    <div id="guestList" className="block">
      <label
        htmlFor="guestList"
        className={classNames(
          'allison',
          "text-6xl font-semibold text-balance",
          "text-winter-green",
          "sm:text-8xl grid",
          // "justify-content align-items"
        )}
      >
        {t('search.label')}
      </label>
      <Input
        type="text"
        name="name"
        placeholder={t("search.placeholder")}
        className={classNames(
          "relative mb-2 bg-white/75 outline-winter-green"
        )}
        onChange={handleSearch}
        autoComplete="on"
        translate="no"
      />
      <GuestList filterGuests={filterGuests} />
    </div>
  );
}

export default GuestSearch;
