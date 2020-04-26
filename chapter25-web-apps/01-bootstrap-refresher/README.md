# 01 &mdash; Bootstrap refresher
> A refresher on some basic Bootstrap CSS concepts

## Bootstrap v4.4 Refresher

This section summarizes some basic Bootstrap concepts.

### Containers

Containers are the most the basic layout element in Bootstrap and are required when using our default grid system. Containers are the mechanisms needed to contain, pad, and (sometimes) center the content within them.

There are three different containers:
+ `.container`, which sets a `max-width` at each responsive breakpoint. That is, it will leave some padding space on the left and right until the screen is reaches the `sm` size. At that point, it will take all the width of the document.
+ `.container-fluid`, which is `width: 100%` at all breakpoints. That is, it'll take all the width of the document.
+ `.container-{breakpoint}`, which is `width: 100%` until the specified breakpoint. That is, it will leave some padding space left and right until the given size breakpoint is reached (`xl`, `lg`, `md`, `sm`). Beyound the breakpoint, it will take the whole width of the document.

| NOTE: |
| :---- |
| In responsive design, a *breakpoint* is the point at which a websit's content and design will adapt in a certain way in order to provide the best possible user experience. For example, when a website features responsive design when displaying an HTML table, at a certain screen size some of the table columns will be hidden &mdash; that constitutes a breakpoint. |

### Grid System

Bootstrap's mobile-first flexbox grid lets you build layouts based on a 12-column system, with 5 default responsive tiers.
The following sample, creates a three equal-width column layout. The columns are centered in the page thanks to the parent `.container`.

```hmtl
<div class="container">
  <h2>Three equal-width columns</h2>
  <div class="row">
    <div class="col-sm make-visible">One of three columns</div>
    <div class="col-sm make-visible">One of three columns</div>
    <div class="col-sm make-visible">One of three columns</div>
  </div>
</div>
```

+ Rows are wrappers for columns. Each column has horizontal padding for controlling the space between them.
+ In a grid layout, content must be place within columns, and only columns may be immediate children of rows.
+ Grid columns without an specific width will automatically layout as equal width columns. For example, four instances of `.col-sm`will automatically be 25% wide.
+ Column classes cam be used to indicate the number of columns you'd like to use out of the possible 12. For example, you can use `.col-4` to have three equal-width columns, or `col-2`, `col-6` and `col-4` to have a three-column layout with different widths per column.

You can use `col-{breakpoint}-auto` classes to size columns based on the natural width of their content.

When a breakpoint is reached, columns will automatically stack. If you don't want them to stack, you can use a combination of different classes in order to guide what should stack, and what shouldn't.

```html
<div class="container">
  <h2>Controlling how columns will stack on small screens</h2>
  <h3>Example 1: This will eventually stack when resized</h3>
  <div class="row">
    <div class="col-md-8 make-visible">.col-md-8</div>
    <div class="col-md-4 make-visible">.col-md-4</div>
  </div>
  <h3>Example 2: This will never stack when resized</h3>
  <div class="row">
    <div class="col-6 make-visible">.col-6</div>
    <div class="col-6 make-visible">.col-6</div>
  </div>
</div>
```

### Content

The content sections servers as a refreshing of the different HTML5 elements.

### Typography

