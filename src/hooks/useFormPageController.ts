import React, { useState, createRef } from 'react';
import { FormikProps } from 'formik';
import { isEmpty } from 'lodash';

interface TPage<T> {
  id: T;
  index: number;
  isActive: boolean;
  formController: React.MutableRefObject<FormikProps<any> | null>;
}
interface TUseFormPageControllerOptions<T> {
  pages: T[];
  startPage?: T;
  completed?: T[];
}

export interface TFormPageController<T = any> {
  activePage: TPage<T>;
  pages: TPage<T>[];
  goToPage: (id: T) => void;
  nextPage: () => void;
  previousPage: () => void;
  getPage: (id: T) => TPage<T>;
  validate: () => Promise<boolean>;
}

const useFormPageController = <T = any>(options: TUseFormPageControllerOptions<T>) => {
  const getPages = options.pages.map<TPage<T>>((p, index) => {
    return {
      id: p,
      index,
      isActive: options.startPage ? p === options.startPage : index === 0,
      formController: createRef<FormikProps<any> | null>(),
    };
  });
  const [pages, setPages] = useState<TPage<T>[]>(getPages);
  const activePage = pages.find((p) => p.isActive)!;

  const nextPage = () => {
    setPages(
      pages.map((p) => ({ ...p, isActive: p.index === activePage.index + 1, isSubmitted: true })),
    );
  };

  const previousPage = () => {
    if (activePage.index === 0) return;

    setPages(pages.map((p) => ({ ...p, isActive: p.index === activePage.index - 1 })));
  };

  const goToPage = (id: T) => {
    setPages(pages.map((p) => ({ ...p, isActive: p.id === id })));
  };

  const getPage = (id: T) => pages.find((p) => p.id === id)!;

  const validate = async () => {
    let invalidPage: TPage<T> | null = null;

    for (let i = 0; i < pages.length && !invalidPage; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const errors = await pages[i].formController.current?.validateForm();

      if (!isEmpty(errors)) {
        invalidPage = pages[i];
      }
    }

    if (invalidPage) {
      goToPage(invalidPage.id);

      requestAnimationFrame(() => getPage(invalidPage!.id).formController.current?.submitForm());

      return false;
    }

    return true;
  };

  return {
    activePage,
    pages,
    goToPage,
    nextPage,
    previousPage,
    getPage,
    validate,
  };
};

export default useFormPageController;
