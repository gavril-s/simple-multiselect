# simple-multiselect

`simple-multiselect` is a simple script for creating multiple options select inputs designed to work with `Bootstrap`.

## how to get

```html
<script src="https://cdn.jsdelivr.net/gh/gavril-s/simple-multiselect@master/simple-multiselect.js"></script>
```

*(there is not versioning yet)*

## examples

This form:

```html
<form hx-post="/" class="mt-4">
    <select id="select-1" multiple name="select-1" onreplace="log(evt);">
        <option value="first">FIRST</option>
        <option value="second">SECOND</option>
        <option value="third">THIRD</option>
    </select>
    <button type="submit" class="btn btn-primary mt-2">Submit</button>
</form>
```

gives you this multiselect:

![screen recording](readme-assets/result.mov)

When submited, it gives the same result, as the original form would:

![alt text](readme-assets/submit.png)
