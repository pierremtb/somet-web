Meteor.startup(function () {
    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/',
        checkCreateDirectories: true //create the directories for you
    });
});

Push.debug = true;

Push.allow({
    send: function (userId, notification) {
        // Allow all users to send to everybody - For test only!
        return true;
    }
});
