# Install

`$ yarn`

# Run

`$ yarn dev`

# Exercise

## Code maintainability

- break down UI and logic into components and hooks that focus on their own responsibilities
- logical folder structure to organize file with emphasis on colocation
- consistent and explicit naming in code to enhance readability
- `common` folder to hold components, hooks and utils to be shared across the project
- handle API request logic in `my-retirement-services.ts`, `api-request.ts` and `api-error.ts`
- apply proper typing to catch issues early
- cache frequently used data in context for easy sharing

## Extensibility - reuse components for another site with a different look and feel

- use theme for component styling to enhance portability
- break down components logically and extract commonly used components to enhance reusability
- store locale in context for time and number display

## Author's note

To maximize my time and focus for the exercise itself, I went for packages I am most familiar with, e.g., ant-design, react-query, react-router, and dayjs. For the same reason, I chose React instead of Angular. Cheers!
