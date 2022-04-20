export function getMainSidebar() {
  return [
    {
      text: "Introduction",
      children: [
        { text: "What is vue-kbar", link: "/" },
        { text: "Getting started", link: "/intro/getting-started.html" },
      ],
    },
    {
      text: "Advanced",
      children: [
        { text: "Reactive actions", link: "/advanced/reactive-actions.html" },
        { text: "Nested actions", link: "/advanced/nested-actions.html" },
        { text: "Sorting actions", link: "/advanced/sorting-actions.html" },
        {
          text: "Enable / disable kbar",
          link: "/advanced/enable-disable-kbar.html",
        },
        {
          text: "Control kbar manually",
          link: "/advanced/control-kbar-manually.html",
        },
      ],
    },
  ];
}
