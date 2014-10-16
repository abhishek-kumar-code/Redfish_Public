How to merge when there are conflicts:

```sh
$ git checkout master # Make sure we start on master
$ git pull --rebase # Update to lastest master without doing a merge
$ git checkout -t origin/mg-chassis-logs -b mg-chassis-logs # Get a copy of the remote branch locally
$ git rebase master # This will drop you to a conflict resolution step telling you which files couldn't be merged
$ git status # Look to see which files need to be merged, the link starts with `UU`
$ git rebase --abort # Abandon the rebase since the conflict was caused by a commit we didn't want
$ git rebase -i HEAD~2 # Start an interactive rebase where you can edit the order/inclusion of commits
$ # Deleted the offending commit from the editor the opened up and saved
$ git push -f origin mg-chassis-logs # Overwrite the branch that has been published with changes
```
