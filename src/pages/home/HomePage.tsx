import { FC } from "react";
import { Link } from "react-router-dom";

import { BackwardFilled, ForwardFilled } from "@ant-design/icons";
import { css } from "@emotion/react";

import { AppPageHeading } from "../../common/components/AppPageHeading";

export const HomePage: FC = () => {
  return (
    <>
      <AppPageHeading>HOME</AppPageHeading>
      <p
        css={css`
          font-size: 1.5rem;
        `}
      >
        Thanks for the opportunity! Exercise:{" "}
        <Link to="/my-retirement">
          <strong>
            <ForwardFilled />
            My Retirement
            <BackwardFilled />
          </strong>
        </Link>
      </p>
      <h2>Exercise</h2>
      <h3>Code maintainability</h3>
      <ul>
        <li>
          break down UI and logic into components and hooks that focus on their
          own responsibilities
        </li>
        <li>
          logical folder structure to organize file with emphasis on colocation
        </li>
        <li>consistent and explicit naming in code to enhance readability</li>
        <li>
          common folder to hold components, hooks and utils to be shared across
          the project
        </li>
        <li>
          handle API request logic in my-retirement-services.ts, api-request.ts
          and api-error.ts
        </li>
        <li>apply proper typing to catch issues early</li>
        <li>cache frequently used data in context for easy sharing</li>
      </ul>
      <h3>
        Extensibility - reuse components for another site with a different look
        and feel
      </h3>
      <ul>
        <li>use theme for component styling to enhance portability</li>
        <li>
          break down components logically and extract commonly used components
          to enhance reusability
        </li>
        <li>store locale in context for time and number display</li>
      </ul>
      <h3>Author's note</h3>
      <p>
        To maximize my time and focus for the exercise itself, I went for
        packages I am most familiar with, e.g., ant-design, react-query,
        react-router, and dayjs. For the same reason, I chose React instead of
        Angular. Cheers!
      </p>
    </>
  );
};
