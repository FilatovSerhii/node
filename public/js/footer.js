document.write(`
  <footer>
    <p>&copy; <span id="year"></span> All rights reserved.</p>
    <script>
      document.getElementById('year').textContent = new Date().getFullYear();
    </script>
  </footer>
`);