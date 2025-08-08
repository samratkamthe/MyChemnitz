import React from 'react'
import Footer from './Footer'

const About = () => {
  return (
    <div>
      <h1>About MyChemnitz</h1>
      <strong>Welcome to our interactive cultural exploration platform built exclusively for the city of Chemnitz. This website provides an engaging way to explore Chemnitz’s rich cultural heritage using an interactive map. After logging in, users can discover, bookmark, and organize cultural spots of interest, making it easier to explore or revisit them later. Whether you're a resident or a tourist, this tool helps you navigate the city's cultural landscape effortlessly.</strong>
      <hr />
      <h2>Our Mission</h2>
      <code>Our mission is to make Chemnitz’s cultural heritage more accessible, engaging, and personal for everyone. We aim to help users explore the city's cultural spots, bookmark their favorite places, add personal notes, and create a deeper connection with the city — all through an intuitive, map-based platform.</code>
      <br />
      <br />


      <h3>Key Features</h3>
      <ul>
        <li><strong> Interactive Map Integration:</strong></li>
        <ul>
          <li>All major cultural spots in Chemnitz are marked on the map with red markers.</li>
          <li>Users can click on a marker to view detailed information about that location.</li>
        </ul>
        <li><strong>  User Authentication:</strong></li>
        <ul>
          <li>Secure Login and Signup functionality.</li>
          <li>Each user gets a personalized experience tied to their account.</li>
        </ul>
        <li><strong> Bookmark Locations:</strong></li>
        <ul>
          <li>After logging in, users can bookmark any cultural location for future reference.</li>
          <li>Bookmarked spots are saved and accessible across sessions.</li>
        </ul>
        <li><strong> Add Personal Notes:</strong></li>
        <ul>
          <li>Users can write and save custom notes about any bookmarked location.</li>
          <li>These notes are private and help users remember specific details or plans.</li>
        </ul>
        <li><strong> Remove Bookmarks:</strong></li>
        <ul>
          <li>Bookmarked locations can be removed easily from the bookmark page.</li>

        </ul>
        <li><strong>  List View of Locations:</strong></li>
        <ul>
          <li>Users can switch between map view and a list view to browse all cultural spots.</li>
          <li>This enhances accessibility and usability, especially on smaller devices.</li>
        </ul>
        <li><strong>  Quick Info Access & Filter Options:</strong></li>
        <ul>
          <li>Clicking on a red location marker on the map shows detailed information about that spot instantly.</li>
          <li>Selected any Specific Category from the Filter List to see location specific to selected category</li>
        </ul>
      </ul>
      <br />
      <br />



      <h3>How to Get Started</h3>
      <ul>
        <li><strong>Create an Account:</strong> Sign up for a free MyChemnitz account to get started. Your account ensures that your data is securely stored and accessible from any device.</li>

        <li><strong>Log In:</strong> Once you've created your account, log in to access your personalized dashboard and then Search for the Spots you will like to know about either with name , filter options, or directly on the map.</li>

        <li><strong>Add and Manage Bookmarks and your Personal notes:</strong> You can only bookmark the location if you are logged In and also you can use the intuitive note editor to add, edit, and organize your notes. Tailor your notes to suit your unique needs.</li>

        <li><strong>Update or Delete:</strong> Need to make changes? Our Application allows you to update your notes or delete them when they're no longer needed.</li>
      </ul>
      <br />
      <br />

      <h3>About the Developer</h3>
      The MyChemnitz Application is brought to you by a passionate developer <code>'Samrat.K'</code> dedicated to creating tools that enhance productivity and organization. We value your feedback and continuously strive to improve our Application based on your suggestions.
      <br />
      <br />
      <br />
      <hr />

      <h2>Contact Us</h2>
      Have questions, feedback, or need assistance? We're here to help! Reach out to our support team at support@MyChemnitz.com.

      Thank you for choosing Our Application as your digital Locator companion.


      <br />
      <br />
      <Footer />
    </div>
  )
}

export default About
