#Overview

The test framework for the SPMF repository is built on Node.js. It validates that all JSON files are valid JSON syntax that all XML
files are valid XML syntax. That all JSON schema files are valid JSON schema and that all CSDL files are valid CSDL files.

Additionally, it now uses a Node Package to verify that the mockups match the CSDL. However, this check is only done on the master branch
and on pulls going into the master branch to allow task forces or other small groups to work in mockup first without CSDL without build 
errors. This document describes how to run the test suite on a local machine should you wish to run the full test suite without Travis or
if you wish to test mockup syntax on a branch that is not master.

#Setup

##Windows
1. First download [Node.js](https://nodejs.org/en/). I recommend the LTS version, but any reasonably current version should be fine.
2. If not already present, install a copy of Visual Studio (this guide assumes 2015). You can find the free version [here](https://www.visualstudio.com/vs/visual-studio-express/).
3. Launch the Node.js command line (Start->Node.js->Node.js Command Prompt)
4. Configure Node to work with Visual Studio 2015 by running the command `npm set msvs_version=2015`
5. If you are behind a corporate firewall go to the "Behind a corporate firewall" section, otherwise skip to "Installing Node Packages"

##Linux
1. Install Node Version Manager (NVM). `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`
2. Install Node with NVM (this command will give you the same version as Travis, but other version should work) `nvm install 6.3`
3. If you are behind a corporate firewall go to the "Behind a corporate firewall" section, otherwise skip to "Installing Node Packages"

##Behind a corporate firewall
1. We need to let Node Package Manager (NPM) know about the firewall so that it can install packages.
2. Run the following command to set the HTTP Proxy: `npm set proxy http://username:password@proxy-address`
3. Run the following command to set the HTTPS Proxy: `npm set https-proxy http://username:password@proxy-address`
4. We also need to let the test scripts know about the firewall so that it can download CSDL files through the firewall
5. To set the HTTP Proxy we need to set the environment variable (either `set` on Windows or `export` on Linux) `HTTP_PROXY` to the
same value as was used in Step 2

NOTE: If your username contains a \ as in a Windows Domain replace the '\' with '%5C' in your username

##Installing Node Packages
1. Go to the directory that you have cloned the SPMF repository to
2. Run the command `npm install` this will download and compile all dependent packages

#Running the tests
Once you have completed everything above, you shouldn't have to do it again. 
1. Run `npm test`

#FAQ
## I get an error "Failed to locate: CL.exe ..." during `npm install` ##
Make sure the Visual Studio C++ compiler is installed. ("File -> New Project -> Visual C++ -> Install Visual C++ components" from Visual Studio or "Programing Languages->Visual C++" during the installation.)

## I get an error "The Windows SDK version 8.1 was not found." during `npm install` ##
Download and install the Windows 8.1 SDK from https://developer.microsoft.com/en-us/windows/downloads/windows-8-1-sdk
