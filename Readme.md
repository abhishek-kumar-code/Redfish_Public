
#SPMF Github User Guide

[![Build Status](https://magnum.travis-ci.com/DMTF/spmf.svg?token=ozH2uEG6iB1dbkNvyKLZ&branch=master)](https://magnum.travis-ci.com/DMTF/spmf)

This is a guide to the policies and procedures used by the Forum for managing documents and code deliverables in the private Github repository.  This is solely a guide to the SPMF's usage of Github and the processes for handling issues and submissions.  **This is NOT a substitute for learning how to use Github itself. **

New Forum members are urged to read this document before performing any action on the Github repository to avoid running afoul of Forum Policies and Procedures.

All members are encouraged to create a local clone (not a fork) of the repository to perform work, as this helps to prevent accidental changes to the Master branch or other mistakes that require manual intervention to correct.  Remember to always work in a Branch (not Master), even in a local clone.

## Obtaining Access

Only SPMF Forum members shall have access to the repository.  Forum Alliance Partners, Contractors or other individuals may be granted access according to DMTF and SPMF Policy.

## Contents of the SPMF Repository

contains forum work, documents, code, normative and informational...

### Master Branch

The 'Master' (or main) branch of the repository contains deliverables that have been approved by the Forum.  No submissions, edits or merge of pull requests are allowed into the Master branch without the express approval by Forum members - usually during an SPMF meeting or conference call.

The Forum co-Chairs reserve the right to make typographical, syntax, formatting or other editorial corrections to items in the Master branch in order to complete release processes, correct issues with Forum deliverable, or otherwise resolve issues impeding Forum business.

### Directories

The following are the primary directories within the SPMF repository:

Make into a table...

#### Root
spec and other docs
#### Mockups
#### Metadata
#### json-schema
#### Registries
#### Other
Release, test

### Other Repositories

#### Redfish-tools
Public repo for tools

#### spmf-tools
Private repo for internal tools or staging for public tools
 
## Using the Github Repository  

### SPMF Viewer
http://dmtf.github.io/spmf



### Entering Issues

Forum members are encouraged to enter issues against any of the Forum deliverables.  This includes questions about the specification or schema where something is not clear or obvious.  

Create a new issue using Github's "New Issue" button.  It is helpful to label the issue to indicate the area or deliverable that the issue pertains to, if known.  Labels including "Schema", "Specification", "Protocol" or FAQ or White Paper" are commonly used for this purpose.

### Working in Branches

Everying in a branch...

### Pull Request

define workflow

#### Connecting Pull Request to an open Issue

## Issue Management Process

### Triage

During SPMF meetings, triage is performed on new issues, with discussion, categorization and assignment of an owner.  The issue creator is welcome and encouraged to self-assign ownership and propose a solution to the issue (going as far as generating a pull request) prior to triage.   

### Review and Create Pull Request

Once a solution and disposition for the issue been decided by the Forum, that solution is documented in an issue comment, and the issue is labeled with "Approved".  The assigned owner is then tasked with completing the work to resolve the issue.  

### Create Branch and Pull Request

The assigned owner shall create a branch from Master to perform the work needed to address the issue.  Once work has been completed, the owner shall create a Pull Request 
and label the issue with "Ready for Review" so that the solution can be reviewed by the Forum.  The Pull Request should list the Issue Number (using "#<issue>") in the comment to tie the Pull to the open Issue (which allows the issue to be closed automatically when the branch is merged into Master).

### Approval, Merging and Automatic Checks

watch for FAIL!

### Label Flow

Issues follow the following general flow, using labels to indicate their current status and allow for easy sorting:

- No label : A new issue.
- Bug or Question:  An issue that has been identified as a bug or a question for discussion.
- Approved : The Forum has approved a solution to the issue and an owner is assigned to perform the work and create a Pull Request
- Ready for Review:  The issue and/or Pull Request are ready for the Forum to review (and merge).
- Closed:  Once the Pull Request is approved and merged into Master, the issue is Closed.

There are a number of Forum-defined custom Github labels.  See the "Label Usage" section below for an exhaustive list.


## How to Submit New Proposals or Schemas

Technology submisssion vs. company/individual submission

How to submit new stuff we didn't ask for...

## Label Usage

In addition to the normal Github labels, the following custom labels have been created to help track and categorize issues.


| Label	| Usage	|
| ---	| ---	|
| Action Item | An issue entered to track a task for the Forum, which may or may not involve one of the Forum deliverables.  Action items are tracked here in this manner to keep all Forum tasks listed in one place. |
| Approved | The issue has been reviewed by the Forum and the proposed solution, documented in a comment, has been approved.  Once the work to address the issue has been completed, this issue should be labelled with 'Ready for Review' along with a pull request containing the solution. |
| FAQ or White Paper | This issue is directed at the Redfish FAQ, White Paper or other informative documents produced by the Forum |
| JsonSchema Generator Tool | This issue involves the CSDL-to-JSON-schema conversion tool. |
| Mockup | This issue involves one or more of the Redfish JSON payload mockups. |
| Protocol | This issue involves the network protocol definition, usage, error response or other functionality as shown in the Redfish Specification. |
| Ready for Review | This issue or Pull Request is ready for the Forum members to review and approve.  This is an indication that a solution has either been proposed, or was previously approved. In either case, Forum member review and approval is required to merge the changes into the Master branch. |
| Schema Supplement | This issue is directed at the normative Redfish Schema Supplement document. |
| Schema | This issue involves one or more Redfish schema definitions, either a structural issue with the schema, or an issue with the underlying data model definition. |
| Security | This issue pertains to security-related topics such as authentication, privileges or encryption. |
| Specification | This issue is directed at the Redfish Specification document itself. |
| TF_<name> | This issue is directed at work being performed and currently owned by one of the SPMF Task Forces.  Task Force issues are addressed in Task Force meetings, where issues are resolved and merges are allowed into the Task Force branch - but not Master. |
| Vote to Merge | This label indicates that an issue or pull request is ready for review, and the issue owner has requested voting members to approve the solution.  This is a method to streamline Forum meetings by indicating members have completed their review of a solution to an issue. |

# Administration

## Travis automatic tools
Chris TODO...
## Release process
## github.io

