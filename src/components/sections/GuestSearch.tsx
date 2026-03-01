'use client'

import { ChangeEvent, FC, useMemo, useState } from 'react';
import { GuestList } from './GuestList';
import { useTranslations } from 'next-intl';
import { GuestDataVariable, useSearchContext } from '@/context/SearchContext';
import classNames from 'classnames';

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
      {/* <label htmlFor="guestList" className="block text-sm/6 font-medium text-gray-900">
        {t("search.label")}
      </label> */}
      <label
        htmlFor="guestList"
        
        className={classNames(
          'allison',
          "mt-4 text-5xl font-semibold text-balance",
          // "text-winter-green",
          "sm:text-8xl grid justify-content align-items"
        )}
      >
        {t('search.label')}
      </label>
      <input
        type="text"
        placeholder={t("search.placeholder")}
        // disabled={loading}
        className={classNames(
          "block w-full rounded-md bg-white py-2 px-3 text-base text-gray-800",
          "outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400",
          "focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 w-full mb-2"
        )}
          // value={searchTerm}
        onChange={handleSearch}
        autoComplete="on"
        translate="no"
      />
      <GuestList filterGuests={filterGuests} />
    </div>
  );
}

export default GuestSearch;
