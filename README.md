# Example Office Add-In Using Laravel Passport

This is a modified version of the Yo Office CLI generated Add-In template. [Original Repo](https://github.com/OfficeDev/Office-Addin-TaskPane-JS)

The purpose of this repo is to serve as an example OAuth integration with Laravel for an Outlook Add-In.

## Installation

Copy .env-example to .env and populate with:

- Application's Passport implicit authorization route (see below for example)
- Application's API endpoint

Run: 

```shell script
yarn install
yarn dev-serve
```

Import the Add-In into your Outlook application or Outlook web (**see note below** [Sideload Outlook add-ins for testing](https://docs.microsoft.com/en-us/office/dev/add-ins/outlook/sideload-outlook-add-ins-for-testing))

NOTE: At the time of creating this, "Sideload automatically" is not functional with Outlook so this can be ignored in the above URL. Manual load still has hot-reloading while using dev-serve when testing in Outlook for Web or a local installation of Office.

Select an email to reveal your add-in and click "Show Taskpane" to test your OAuth flow.

## Laravel Config

Follow the normal configuration steps for Laravel Passport.

Create a new client and set its redirect URL to https://localhost:3000/oauth.html

Add your implicit OAuth route that is specified in your Add-In .env.

Basic example: 

```php

//web.php
Route::get('/implicit', function(Request $request) {

    $request->session()->put('state', $state = Str::random(40));

    //update client_id to match your new client
    $query = http_build_query([
        'client_id' => '3',
        'redirect_uri' => "https://localhost:3000/oauth.html",
        'response_type' => 'token',
        'scope' => '',
        'state' => $state,
    ]);

    return redirect('/oauth/authorize?'.$query);

})->middleware(['auth']);
```

### All contents below are from the original Readme generated by the CLI tool.

# Office-Addin-TaskPane-JS

This repository contains the source code used by the [Yo Office generator](https://github.com/OfficeDev/generator-office) when you create a new Office Add-in that appears in the task pane. You can also use this repository as a sample to base your own project from if you choose not to use the generator. 

## JavaScript

This template is written using JavaScript. For the [TypeScript](http://www.typescriptlang.org/) version of this template, go to [Office-Addin-TaskPane](https://github.com/OfficeDev/Office-Addin-TaskPane).

## Debugging

This template supports debugging using any of the following techniques:

- [Use a browser's developer tools](https://docs.microsoft.com/office/dev/add-ins/testing/debug-add-ins-in-office-online)
- [Attach a debugger from the task pane](https://docs.microsoft.com/office/dev/add-ins/testing/attach-debugger-from-task-pane)
- [Use F12 developer tools on Windows 10](https://docs.microsoft.com/office/dev/add-ins/testing/debug-add-ins-using-f12-developer-tools-on-windows-10)

## Questions and comments

We'd love to get your feedback about this sample. You can send your feedback to us in the *Issues* section of this repository.

Questions about Microsoft Office 365 development in general should be posted to [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API).  If your question is about the Office JavaScript APIs, make sure it's tagged with  [office-js].

## Additional resources

* [Office add-in documentation](https://docs.microsoft.com/office/dev/add-ins/overview/office-add-ins)
* More Office Add-in samples at [OfficeDev on Github](https://github.com/officedev)

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Copyright

Copyright (c) 2019 Microsoft Corporation. All rights reserved.
