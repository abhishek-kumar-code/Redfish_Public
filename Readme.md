[![Build Status](https://magnum.travis-ci.com/DMTF/Redfish.svg?token=ozH2uEG6iB1dbkNvyKLZ&branch=master)](https://magnum.travis-ci.com/DMTF/Redfish)
<p align="center">
  <img src="http://redfish.dmtf.org/sites/all/themes/dmtf2015/images/dmtf-redfish-logo.png" alt="DMTF Redfish" width=180>
</p>

# Redfish Forum Github User Guide

This is a guide to the policies and procedures used by the Forum for managing documents and code deliverables in the private Github repository.  This is solely a guide to the Redfish Forum's usage of Github and the processes for handling issues and submissions.  **This is NOT a substitute for learning how to use Github itself.**

New Forum members are urged to read this document before performing any action on the Github repository to avoid running afoul of Forum Policies and Procedures.

All members are encouraged to create a local clone (not a fork) of the repository to perform work, as this helps to prevent accidental changes to the Master branch or other mistakes that require manual intervention to correct.  Remember to always work in a Branch (not Master), even in a local clone.

## Obtaining Access

Only Redfish Forum members shall have access to the repository.  Forum Alliance Partners, Contractors or other individuals may be granted access according to DMTF and Redfish Forum Policy.  All Redfish Forum members by default have read-only access to the repository which allows issues to be entered, cloning or forking of the repository, or pull requests (from the repository or a clone) to be made.  Forum members which require read-write access may request it from their company's Primary or Alternate representative, who will determine the need and request access from the co-Chair.  All requests for "Author" (read-write) access received by the co-Chair will be approved.

## Contents of the Redfish Repository

The "Redfish" private repository contains forum work in progress, published documents and specifications (both normative and informational), schema files and mockups.  Presentations, documents and other binaries (in formats not natively supported by Github) releated to Forum business are stored in the DMTF's web site under the Redfish Forum: https://members.dmtf.org/apps/org/workgroup/redfish/

### Master Branch

The 'Master' (or main) branch of the repository contains deliverables that have been approved by the Forum.  No submissions, edits or merge of pull requests are allowed into the Master branch without the express approval by Forum members - usually during a Redfish Forum meeting or conference call.

The Forum co-Chairs reserve the right to make typographical, syntax, formatting or other editorial corrections to items in the Master branch in order to complete release processes, correct issues with Forum deliverables, or otherwise resolve issues impeding Forum business.

### Contents of the Repository

In the root folder of the repository are the primary normative documents (specifications) created by the Redfish Forum.  Other files in the root folder are supporting files of the repository and are not normally accessed or referenced.

| Filename | Description |
|----------|-------------|
| Readme.md | This document - the Redfish Forum Github User Guide |
| Specification.md | The Redfish API Specification - DSP0266 |
| HostInterfaceSpecification.md | The Redfish Host Interface Specification - DSP0270 |
| RedfishInteroperabilityProfiles.md | The Redfish Interoperability Profiles Specification - DSP0272 |
| RedfishMTFTracker.md | Redfish activities tracking document for the DMTF Marketing Task Force |
| SchemaSupplement.md | Redfish Schema Supplement - DSP0268 |

Off of the root are several folders which contain the schemas and mockups created by the Forum.

| Folder       | Contents |
|--------------|----------|
| docs         | Informative documents (non-normative) in Markdown format |
| docs/support | Supporting documents (mostly READMEs) or input files used by documentation generation tools |
| json-schema  | Redfish Schema files in json-schema format |
| metadata     | Redfish Schema files in CSDL format |
| mockups      | Redfish Mockups including the "development" and published, public-facing mockups |
| openapi      | Redfish Schema files in OpenAPI v3 YAML format |
| profiles     | Redfish Interoperability Profiles |
| registries   | Redfish Message Registries |
| release      | Individual released (published) documents in HTML and PDF formats |
| submissions  | Technology Submissions received via the DMTF Submission Portal |
| test         | Supporing files for managing the repository |


### Other Repositories

The Redfish Forum maintains several other repositories on Github within the DMTF organization.  See the README document in each of these repositories for more information.
  
#### Redfish-tools

[https://github.com/DMTF/Redfish-tools](https://github.com/DMTF/Redfish-tools "https://github.com/DMTF/Redfish-tools")

This is the public repository containing tools developed by the Forum and released as open source.  Code posted here has been approved by the Forum for public release.  Forum members contributing code to the Forum should use the private spmf-tools repository for those submissions.

#### spmf-tools

[https://github.com/DMTF/spmf-tools](https://github.com/DMTF/spmf-tools "https://github.com/DMTF/spmf-tools")

This is the Private repository for both internal tools (not intended for public release)or for staging or development of tools intended for eventual public release in the Redfish-tools repository.

#### redfish-samples


[https://github.com/DMTF/redfish-samples](https://github.com/DMTF/redfish-samples "https://github.com/DMTF/redfish-samples")

This Private repository contains samples of Redfish Service implementations, in the style of a "mockup" which can be used with the Redfish tools to emulate the implementation's JSON payload responses.


## Using the Github Repository

### Entering Issues

Forum members are encouraged to enter issues against any of the Forum deliverables.  This includes questions about the specification or schema where something is not clear or obvious.  Requests for new functionality in the specifications or schema are also made by creating a new issue, which will be marked as an enhancement request.

Create a new issue using Github's "New Issue" button.  It is helpful to label the issue to indicate the area or deliverable that the issue pertains to, if known.  Labels including "Schema", "Specification", "Protocol" or "FAQ or White Paper" are commonly used for this purpose.

### Working in Branches

Any proposed change, fix, addition or enhancement to the Forum deliverables must be approved before the change is merged into the Master branch.  For that reason, all work must occur in a branch off of Master so that the work can be reviewed in its entirety via a Pull Request.  By creating a branch, you can make changes or additions to numerous files in the repository and have them all reviewed together.  This is typical of Forum business, as an addition to a Schema may require changes to a number of schema files, the mockups, and perhaps the Specification itself.

Note: Make sure you create (and select) a branch before starting any work to avoid losing changes or inadvertently saving unapproved changes directly to the Master branch.

Any unapproved changes to the Master branch may be reverted by the co-Chair without notice.

### Pull Requests

When work on a proposed fix or addition to the deliverables has been completed, the author makes a Pull Request to signal that this work is ready for review by the Forum for merging into the Master branch. The related issue should be mentioned in the comment for the Pull Request, using the "Fix #nnn" notation, which will allow Github to tie the pull to the issue, and automatically close the issue once the pull has been merged.  This notation also provides a link in the issue and pull request so that reviewers can easily find the proposed solution or vice versa.

Fixes for issues can be proposed prior to an agreed Approved solution, this is encouraged for obvious errors or other straightforward changes or enhancements.  It is not uncommon for the Forum to review a Pull Request which addresses a new issue (going through triage during a meeting).

Pull Requests for non-trivial enhancement requests should not be created until a presentation has been made to the Forum, or the enhancement request has been discussed during issue triage.  As Pull Requests are the most visible aspect of the Github process, material that has not been reviewed prior to the creation of the Pull Request causes confusion among members.  The co-Chair reserves the right to close Pull Requests that do not address an Approved issue for this reason.

## Issue Management Process

### Triage

During Redfish Forum meetings, triage is performed on new issues, with discussion, categorization and assignment of an owner.  The issue creator is welcome and encouraged to self-assign ownership and propose a solution to the issue (going as far as generating a pull request) prior to triage.

### Review Issue and Assign Owner

Once a solution and disposition for the issue been decided by the Forum, that solution is documented in an issue comment, and the issue is labeled with "Approved".  The assigned owner is then tasked with completing the work to resolve the issue.

### Create Branch and Pull Request

The assigned owner shall create a branch from Master to perform the work needed to address the issue.  Once work has been completed, the owner shall create a Pull Request and label the issue with "Ready for Review" so that the solution can be reviewed by the Forum.  The Pull Request should list the Issue Number (using "#<issue>") in the comment to tie the Pull to the open Issue (which allows the issue to be closed automatically when the branch is merged into Master).

### Approval, Merging and Automatic Checks

Once all comments have been reviewed and the Forum has agreed to the changes, the co-Chair will call to Merge the changes into the Master branch.  The Travis CI processes will be allowed to execute to check for any syntax errors or other technical issues with the changes before the merge is completed.  Unless otherwise requested, merged branches will be deleted from the repository.  The co-Chair or an appointed repository maintainer will merge approved pull requests upon completion of the Travis CI checks as they complete (which likely occurs after Redfish Forum meetings have adjorned).

### Label Flow

Issues follow the following general flow, using labels to indicate their current status and allow for easy sorting:

- No label : A new issue.
- Bug or Question:  An issue that has been identified as a bug or a question for discussion.
- Approved : The Forum has approved a solution to the issue and an owner is assigned to perform the work and create a Pull Request
- Ready for Review:  The issue and/or Pull Request are ready for the Forum to review (and merge).
- Closed:  Once the Pull Request is approved and merged into Master, the issue is Closed.

There are a number of Forum-defined custom Github labels.  See the "Label Usage" section below for an exhaustive list.


## Release Branch Management Process

### Release Branch Names

Branches are created at major milestones, such as publishing a new version of the specification.  In order for work to continue in master while the new collateral is under review, branches are created so patches can be made if a mistake is found.  This also allows the group to maintain a release branch for errata publications.  The following branch names are used for the different publications produced by the group:
- DSP0266-X.Y: Redfish Specification errata patches for a given major (X) and minor (Y) version of the specification
- DSP8010-XXXX.Y: Redfish Schema bundle patches for a given year (XXXX) and release number (Y) of the bundle

### Patching Process

Pull requests are used to patch the individual branches, but since the fix must go back into master, a certain flow needs to be followed so that we don't have to duplicate changes, and avoid resynching a given branch with master.  The following steps are taken to accomplish this:
- Checkout the branch that requires a fix (such as DSP0266-1.2): git checkout -b DSP0266-1.2 --track origin/<branch_name>
- Checkout the branch in which you will do your patch work: git checkout -b My-Patches
- Make your changes and commit the files: git add file; git commit -m "Fix!"
- Push your branch: git push origin My-Patches
- Make a pull request against the patch branch (such as DSP0266-1.2)
- When the group reviews and merges the changes, do not delete your branch
- Once your changes are merged, open another pull request against master, and follow the standard process for making changes into master


## How to Submit New Proposals or Schemas

The Forum welcomes and encourages submissions of new schema(s), clarifications or additions to the Specification, mockups, tools and other relevant documentation to further the Forum's goals.

### Technology submission vs. Member or individual submission

An DMTF Technology Submission (through the Feedback Portal) is needed when technology has been created by multiple members or non-member companies.  Proposals or submissions made solely by a single Member or individual can be made using a Branch and Pull Request directly in the repository.

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
| TF_<name> | This issue is directed at work being performed and currently owned by one of the Redfish Forum Task Forces.  Task Force issues are addressed in Task Force meetings, where issues are resolved and merges are allowed into the Task Force branch - but not Master. |
| TF_A_Master | This issue is directed at the Specification or Schema, and is to be addressed by the Forum.  This label is used to allow easy filtering of all Task Force-related issues or Pull Requests |
| Vote to Merge | This label indicates that an issue or pull request is ready for review, and the issue owner has requested voting members to approve the solution.  This is a method to streamline Forum meetings by indicating members have completed their review of a solution to an issue. |

# Administration

## Travis automatic tools

The Travis Continuous Integration suite of tools are used for verifying syntax and link validity in schema and mockup files.

## Release process

The following is a checklist for schema or specification release:

- Namespace creation: Schema releases must increment the schema version, and therefore must create a new CSDL namespace.
- New schemas: The $metadata example must be updated to include the new schema file(s).

### WIP release process

In addition to the above items, the following also needs to be performed when releasing a WIP package:

- New schemas supporting the WIP must use major version 0 to show that this is unreleased content and is likely to change when adopted as a standard (starting at v0_1_0 is a good idea).
- If the WIP being released is a refresh of an existing WIP, the minor revision of the unreleased schema will be incremented, and the major revision will remain at 0.
- Annotate new namespaces in the CSDL (for both new schemas and extensions to existing schemas) with the following term: `<Annotation Term="Redfish.ReleaseStatus" EnumMember="Redfish.ReleaseStatusType/WorkInProgress"/>`
- Annotate mockups with the following in their payloads: `"@Redfish.ReleaseStatus": "WorkInProgress"`

### HTML document generation

A set of batch/script files are located in the root and release folder which will execute a series of tools to convert the Markdown documents to HTML.  Note that for Windows users, the node.js javascript environment used by these scripts may have issues locating the proper toolchain components of Visual Studio (C/C++).  This is a well-known issue, and following the steps documented here: https://github.com/nodejs/node-gyp/issues/629#issuecomment-153196245 can resolve that issue.

Chris Hoffman has an MD to HTML converter currently in development.  It is available here: https://cehoffman.github.io/dmtf-md2html/

Source code is kept in this repository: https://github.com/cehoffman/dmtf-md2html
