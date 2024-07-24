
# GitHub Embed Repo

GitHub Embed repo is a flexible component that allows you to seamlessly embed GitHub repository information in your web applications. It provides an easy way to showcase your projects with style.

Check the demo at https://oct4pie.github.io/github-embed-repo
- Browsing through repositories
- Display detailed GitHub repository information including stars, forks, issues, and more
- Customizable themes
- Lazy loading for optimal performance
- Lightweight bundle size
- Support for both vanilla JavaScript and React applications
- Built with Chakra UI for consistent styling



https://github.com/user-attachments/assets/b5a53a43-519f-4ef2-a138-7ded588bcd7e



## Installation

You can install the GitHub Embed Repo package using npm or yarn:

```bash
# Using npm
npm install github-embed-repo

# Using yarn
yarn add github-embed-repo
```

## Usage

### Vanilla JavaScript

Include the script in your HTML file and use it as follows:

```html
<script src="https://cdn.jsdelivr.net/npm/github-embed-repo/dist/github_embed_repo.min.js"></script>
<script>
  github_embed_repo.default('repo-details', 'Oct4Pie', 'github-embed-repo', {
    showProfile: true,
    showStats: true,
    theme: 'dark',
    statsToShow: ['stars', 'forks', 'watchers', 'issues', 'pull_requests', 'contributors'],
    component: 'card'
  });
</script>
```

### React

Import the component and use it in your React application:

```jsx
import React from 'react';
import GitRepo from 'github-embed-repo';

const MyComponent = () => (
  <GitRepo 
    user="Oct4Pie" 
    repo="github-embed-repo" 
    options={{
       component: 'card',
      showProfile: true,
      showStats: true,
      theme: 'dark',
      statsToShow: ['stars', 'forks', 'watchers', 'issues', 'pull_requests', 'contributors'],
    }} 
  />
);

export default MyComponent;
```

## Configuration Options

You can customize the component with these options:

```javascript
const options = {
  component: 'card'
  showProfile: true,
  showStats: true,
  theme: 'dark',
  statsToShow: ['stars', 'forks', 'watchers', 'issues', 'pull_requests', 'contributors'],
};
```

- `component`: 'card' for a compact view or 'repo' for a detailed view.
- `showProfile`: Boolean to show or hide the repository owner's profile.
- `showStats`: Boolean to show or hide repository statistics.
- `theme`: 'light' or 'dark' to set the color scheme.
- `statsToShow`: Array of statistics to display.


## Development

To set up the project for development:

1. Clone the repository:
   ```bash
   git clone https://github.com/Oct4Pie/github-embed-repo.git
   ```
2. Install dependencies:
   ```bash
   cd github-embed-repo # or github-embed-repo/demo/react-demo
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
## Support

If you encounter any problems or have any questions, please open an issue on the [GitHub repository](https://github.com/Oct4Pie/github-embed-repo/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

