'use strict'
var mandrill = require('node-mandrill')(process.env.MANDRILL_APIKEY);
// send email to tech support
exports.techSend = function (req, res) {
    var issue_os, issue_browser, issue_browser_ver,
        message_content = req.body,
        issue_tool = message_content.tool.toUpperCase(),
        issue_full_name = message_content.first_name + " " + message_content.last_name;
    //issue_first_name = message_content.first_name,
    //issue_last_name = message_content.last_name,
    if (message_content.os) {
        issue_os = message_content.os;
    } else {
        if(message_content.os_text) {
            issue_os = message_content.os_text;
        } else {
            issue_os = 'None supplied';
        }
    }
    if (message_content.browser) {
        issue_browser = message_content.browser;
    } else {
        if(message_content.browser_text) {
            issue_browser = message_content.browser_text;
        } else {
            issue_browser = 'None supplied';
        }
    }
    if (message_content.browser_ver) {
        issue_browser_ver = message_content.browser_ver;
    } else {
        issue_browser_ver = 'None supplied';
    }
    //send an e-mail to technical support
    mandrill('/messages/send', {
        message: {
            to: [{email: 'tech-support@resourcegovernance.org', name: 'Assessment tool tech support'}],
            from_email: 'tech-support@resourcegovernance.org',
            subject: issue_tool + ' Issue: ' + message_content.issue.value,
            html: "Hi,<p>"
            + issue_full_name + " is having an issue with the " + issue_tool + " tool. Please find more info below.<p>"
            + "<ul><li><b>Issue</b>: " + message_content.issue.name + "</li><<li><b>Issue description</b>: " + message_content.issue_description + "</li>"
            + "<li><b>OS</b>: " + issue_os + "</li><li><b>Browser</b>: " + issue_browser + "</li><li><b>Browser version</b>: " + issue_browser_ver + "</li></ul>"
        }
    }, function (error, response) {
        //uh oh, there was an error
        if (error) console.log( JSON.stringify(error) );

        //everything's good, lets see what mandrill said
        else console.log(response);
    });

    //send a confirmation e-mail to user
    mandrill('/messages/send', {
        message: {
            //to: [{email: message_content.email, name: issue_full_name}],
            to: [{email: 'tech-support@resourcegovernance.org', name: 'Assessment tool tech support'}],
            from_email: 'tech-support@resourcegovernance.org',
            subject: 'Confirmation of ' + message_content.issue.value + ' support ticket',
            html: "Hi " + issue_full_name + "\,<p>"
            + "Thanks for contacting us about an issue with the " + issue_tool + "tool. I'm sorry for the inconvenience\, we will contact you shortly. "
            + "In the meantime please look at the info you supplied below and let us know if any of it is incorrect.<p>"
            + "<ul><li><b>Issue</b>: " + message_content.issue.name + "</li><<li><b>Issue description</b>: " + message_content.issue_description + "</li>"
            + "<li><b>OS</b>: " + issue_os + "</li><li><b>Browser</b>: " + issue_browser + "</li><li><b>Browser version</b>: " + issue_browser_ver + "</li></ul>"
        }
    }, function (error, response) {
        //uh oh, there was an error
        if (error) console.log( JSON.stringify(error) );

        //everything's good, lets see what mandrill said
        else console.log(response);
    });
    res.send();
};
