#!/usr/bin/python

#===============================================================================
#
#  CSDL to JSON Convertor
#
#  Copyright (c) Microsoft Corporation
# 
#  Licensed under the Apache License, Version 2.0 (the "License"); you may not 
#  use this file except in compliance with the License. You may obtain a copy 
#  of the License at 
#
#      http://www.apache.org/licenses/LICENSE-2.0 
#
#  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
#  OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY 
#  IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
#  MERCHANTABLITY OR NON-INFRINGEMENT. 
#
#  See the Apache 2 License for the specific language governing permissions 
#  and limitations under the License.
#
#===============================================================================

import http.client

class Utilities:

    #########################################################################################################
    # Name: show_interactive_mode                                                                           #
    # Description:                                                                                          #
    # Displays a form for input.                                                                            #
    # This method should be called when there is an error or user wants to generate the JSON                #
    # in an interactive fashion                                                                             #            
    #########################################################################################################
    @staticmethod
    def show_interactive_mode(error):
        result  = "Content-type: text/html\n"
        result += "\n"
        result += "<HTML>\n"
        result += " <HEAD>\n"
        result += "  <TITLE>\n"
        result += "   CSDL to JSON Convertor\n"
        result += "  </TITLE>\n"
        result += " </HEAD>\n"
        result += " <BODY>\n"
        result += "  <H1>CSDL to JSON Convertor</H1>\n"
        if error is not None:
            result += "Error: "
            result += error
            result += "\n"        
        result += "  <H2>Overview</H2>\n"
        result += "  <p> This service converts OData CSDL metadata files to JSON Schema equivalents.\n"
        result += "  <H2>Usage</H2>\n"
        result += "  <p> This service can be used in interactive mode or command mode.\n"
        result += "  <H3>Interactive Mode</H3>\n"
        result += "  <p> You are currently using the service's interactive mode.\n"
        result += "  From here, you can use the form below to request conversion of a CSDL metadata file\n"
        result += "  Simply type or paste the URL of the target CSDL Metadata file into the textbox and click Convert\n"
        result += "  <H3>Command Mode</H3>\n"
        result += "  <p> Make an HTTP GET request against a URL of the following form: <b>http://<i>service</i>?url=<i>URL</i>#<i>type</i></b>.\n"
        result += "  Here, <b><i>service</i></b> is the URL to this service (your browser's current address), <b><i>URL</i></b> is the URL of the CSDL Metadata and <b><i>type</i></b> is the type for which to return a JSON Schema representation.\n"
        result += "  Make sure you accept the <b>application/json</b> content type.\n"
        result += "  <FORM target=\"service.py\">\n"
        result += "   URL: <input name=\"url\" type=\"text\" size=\"100\" /> \n"
        result += "   <input name=\"submitBtn\" type=\"submit\" value=\"Convert\" />\n"
        result += "  </FORM>\n"
        result += " </BODY>\n"
        result += "</HTML>\n"
    
        return result


    #################################################################
    # Name: open_url                                                #
    # Description:                                                  #
    # Opens the target file and extracts data from it.              #
    #################################################################
    @staticmethod
    def open_url(url, directory):

        # TODO: handle cases where URL is malformed

        connections = {}
        hostStart = url.find("//")
        prefix = url[:hostStart]
        hostStop = url.find("/", hostStart + 2)
        hostname = url[hostStart + 2 : hostStop]
        resname  = url[hostStop :]
            
        if hostname in connections.keys():
            conn = connections[hostname]
        else:
            conn = http.client.HTTPConnection(hostname)
            connections[hostname] = conn

        conn.request("GET", resname)
        response = conn.getresponse()
        data = response.read()
        decoded = data.decode("utf-8")

        if response.status != 200:
            # try opening as a file
            try:
                fileLocation = url.rfind("/")
                filename=url[fileLocation + 1:] + ".metadata"
                if len(directory) > 0 :
                    filename = directory + "\\" + filename
				
                metafile = open(filename)
                decoded = metafile.read()

            except:
                decoded = ""
                print("failed to open " + url + " as " + filename)
        return decoded


    #################################################################
    # Name: indent                                                  #
    # Description:                                                  #
    # Enumeration for various scenarios                             #
    #################################################################
    @staticmethod
    def indent(depth) :
        return "    " * depth