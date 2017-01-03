# CardinalConnect
####Original Author: Josh Mackin - mackin711@gmail.com

### This file will explain the purpose and the setup for this system.


## The Goal

The goal of this application is to provide a framework where students can connect with the alumni of their school through 
internships, mentorships, and events. The backend to the system will keep track of all users and their statuses - whether
it be alumni or student. Alumni will be invited to post opportunities of mentorships or internships for the students that 
are following in their path. Students will be able to view these opportunities and be able to inquiry about the posted
positions.

The hope of this system is to bring a school together by bringing together the students of present and the students of past.

## Setup

Requirements: Java (and eclipse), Javascript/CSS/HTML, MySQL (and an appropriate bitnami amp stack), Tomcat, Maven, git (use version control!)
     
Beginning with the backend, the database to this application is simply a MySQL database. In order to get the application
setup, it is recommended to run the database locally with a bitnami amp stack. 

- [For Windows](https://bitnami.com/stack/wamp)
- [For Mac] (https://bitnami.com/stack/mamp)
- [For Linux] (https://bitnami.com/stack/lamp)

Essentially what this application gets you is a local runtime of MySQL server. It is fairly simply to setup. 

Once this is setup, we need to work on putting the application on the net (though we run it locally). In order to have 
this application be a web app, it uses [Tomcat](http://tomcat.apache.org/) which is a powerful framework to turn Java
applications into web apps. Tomcat essentially turns a wrapped up .war file into a web application through the use of 
Servlets, and HTML/Javascript. 

Eclipse should be able to both wrap your application as a .war file should you install the web development tool kit which 
proves to be extremely valuable as when it comes to deploy, you simply press "Go" in eclipse and the application is generated.
Furthermore, Eclipse can be used to run the app on a preinstalled Tomcat server. Simply press go and Eclipse will pack your
app and host it on your determined localhost + port. 

Tomcat can be installed from [apache's website](http://tomcat.apache.org/download-80.cgi)

Though we use Tomcat as the framework of the webapp, the actual interactions with the database are entirely found within the 
Java code in the servlets using Hibernate. Hibernate is a fantastic Java-MySQL bridge which allows Java to make both queries
and additions to the database using simple easy to follow commands for programmers familiar with both Java and MySQL. 

In the code you will see calls to

    HibernateUtil.getSession();
    
This call gets our configured settings (set in hibernate.cfg.xml) and is essentially our database session. With this sessions
we can make calls to query and to add to the database even more easily than it is to do it through straight through the MySQL
command line. 

    Query query = session.createQuery(activeInternships);
    List results = query.list();
    
Hibernate lets our application wrap up our database objects into neat little objects which then can be accessed as like any
ordinary Java object. This allows us to manipulate and mess with the data safely and securely before sending it to the 
front-end. Hibernate and its other dependencies can be installed with maven which is a dependency management system for Java. 
Simply import this project as a maven project into eclipse and you will be able to maven refresh your dependencies and so long
as you have the pom.xml file, it will automatically build all of the depenencies that you need for hibernate to work. 

To wrap up the front-end, the entire client side is written in HTML/Javascript. HTML/CSS is to present and style the information
and the Javascript simply makes calls to the Java servlets with certain "actions" that will request many different things. 

This is the simplest part of the application is the simplest to run since if you are viewing this webpage, you already have
the ability to execute and run HTML and Javascript. 

## Help!

If you're lost, here's a few resources for you.

[Getting Started with Servlets and Tomcat](https://www.ntu.edu.sg/home/ehchua/programming/howto/Tomcat_HowTo.html)

[Configuring Eclipse with WebTools and Tomcat](http://www.vogella.com/tutorials/EclipseWTP/article.html)

[Maven in Eclipse](http://stackoverflow.com/questions/8620127/maven-in-eclipse-step-by-step-installation)

[Maybe check out this project with a similar (if not the same) fundamental structure](https://github.com/MillerIntern/MillerRebuilt)


Lastly, if you have any other questions feel free to contact and of the previous developer~~s~~.

    
    
