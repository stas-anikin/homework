<h1>Fall 2022 - Shopify
  Developer Intern Challenge</h1>
<p>
  This is an inventory tracking web application for a logistics company. It has the basic CRUD functionality and an additional feature of allowing deletion comments and undeletion. </p>
<p>
  This project is built using <strong>ruby 2.6.6p146</strong> and <strong>rails 5.1.7</strong>.</p>
<p><strong>Installation steps:</strong></p>
install dependencies
``bundle install`
`create database
```rails db:create```
run migrations
`rails db:migrate`
seed fake data (optional)
`rails db:seed`
start the server
`rails s`
<p>navigate to `http://localhost:3000/` in your browser</p>
<p>
  I chose the path of doing more with less and only used one additional gem for this project – <strong>Faker</strong> to populate the seeds file.</p>
<p>
  Soft deletion could have been implemented with an additional gem such as paper_trail or act-as-paranoid or via <strong>ActiveSupport::Concern</strong>, but I simply added a boolean <strong>“deleted”</strong> column to the items table and customized the update method to allow for soft deletion, undeletion and addition of deletion comments. </p>
<p>
  I also took the note of CSS/Design/Authentication/Custom UI/Frameworks very literally and created a very minimalist and ascetic views. Normally, I would have used <strong>React</strong> with a <strong>Semantic UI</strong> for front end and either <strong>cancancan</strong> or <strong>devise</strong> for authorization purposes depending on the project requirements.</p>
Here is the [**Repl**](https://replit.com/@StanislavAnikin/HoneydewGenerousRom) and here is the [**App**]( https://replit.com/@StanislavAnikin/HoneydewGenerousRom)
  <p>Thank you for your time and consideration!</p>
  
  <h2>A submission by Stas Anikin</h2>
