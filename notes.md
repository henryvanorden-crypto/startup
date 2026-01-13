# CS 260 Notes

## Markdown
**Headings:** use \# to make a heading, the more hashtags the smaller the heading

**Styling:** `** **` for bold text, `_ _` for italics, `~ ~` for strikethrough, `<sub> </sub>` for subscript, `<sup> </sup>` for superscript, `<ins> </ins>` for underlined

**Quote text:** use \> before a line to make something look like ...
> ...a quote

make sure you have an empty line after the quote though

**Quote code:** Use backsticks (\`) to quote code or triple backsticks to make a block of code

**Color:** `#RRGGBB` or `rgb(R,G,B)` or `hsl(H,S,L)`

**Links:** put the link text in brackets and the url in parentheses

**Section Links:** instead of urls you can link to sections using a hashtag followed by the heading name except with all the letters lowercased, dashes instead of spaces, and no other special characters

**Relative Links:** When linking to other files withing your repository use relative links so if someone clones it then it would still work. To do this just write the path from where you are inside the parentheses.

**Custom anchors:** Use custom anchors to link to non-headings. Like this: `<a name="my-custom-anchor-point"></a>`

**Line Breaks:** Use a backslash at the end of the line

**Images:** Same as linking but put an exclamation point in front of the brackets

**Lists:** Use `-`, `*`, or `+` to make bulleted lists. Numbered and nested lists are made as you would think.
1. This is a numbered list
      + this is a nested bullet
2. this is another list item

**Task Lists:** Use a hyphen then a space then `[ ]` with an x in the brackets if you want to mark it off
- [ ] Task 1
- [x] Task 2

**Mentioning People and Teams:** use the @ symbol followed by their username or team name and it will notify them

**Emojis:** use `:EMOJICODE:` [emoji cheat sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/github-actions-auto-update/README.md)

**Footnotes:** Here's an example
```
Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, add 2 spaces to the end of a line.  
This is a second line.
```

**Alerts:** Make text stand out to readers using either `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, or `[!CAUTION]`

**Comments:** `<!-- This is a comment -->`

**Ignore Markdown Formatting:** Use a backslash before the character


# Notes Copied From Example
[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
