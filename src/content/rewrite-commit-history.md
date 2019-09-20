---
title: "Rewrite commit history"
date: "2019-09-08"
description: "As an engineer, we like to keep things organized. Especially, when you are working on the project and the team is growing larger..."
draft: false
path: "/blog/rewrite-commit-history"
---

![https://miro.medium.com/max/12000/1*2AmmzTttPrrgM4iKZ75vDQ.jpeg](https://miro.medium.com/max/12000/1*2AmmzTttPrrgM4iKZ75vDQ.jpeg)

You can find the original post [here.](https://medium.com/@dzungnguyen179/rewrite-commit-history-c5940bb28d97)

# Overview
As an engineer, we like to keep things organized. Especially, when you are working on the project and the team is growing larger. That means there are a lot of engineers working on the same source code and a bunch of commits are made every day. Keeping the git history clean and linear makes it easier for all of the engineers to understand what is going on in the source code. Doing so requires using a few advanced git features. In this article we will learn how to perform 4 git tasks that I believe are essential to keeping your commit history minimal and concise before merging it with the main branch.

- Squash & Reword
- Merge base & Reset
- Amend
- Push force

Before jumping to the detail. Let’s see why we need clean commit history and which scenario should we apply to our work.

# Why clean commit history?

Having the clean commit history brings us 4 main benefits:
- **Documentation**. A linear history is typically easier to follow. This is similar to how you want your code to be well structured and documented: whenever someone needs to deal with it later (code or history) it is very valuable to be able to quickly understand what is going on.
- **Improving code review efficiency**. If a topic branch is divided into linear, logical steps, it is much easier to review the changes between the PR and a target branch.
- **When you need to modify the history at a later time**. For instance when reverting or cherry-picking a feature in whole or in part.
- **Scalability**. Unless you strive to keep your history linear when your team grows larger (e.g. hundreds of contributors), your history can become very bloated with cross branch merges, and it can be hard for all the contributors to keep track of what is going on.

However, beside the benefits there are some drawbacks:

- The clean commit history is only effective only if all members agree to apply it to their work.
- To do this requires some advanced git features, the learning curve costs you some time at first.
- And if you don’t know it well, it can cause you some troubles when you apply it to your project.


# Scenario

I was assigned the task to develop the React components called “List” and “List Item”. So here is what I did:

- Create a new branch called “features/add-list-list-item”

```bash
git checkout -b “features/add-list-list-item”
```

- I made a commit for adding the UI of the ListItem component.

```bash
git commit -m “add the ui of ListItem”
```

- Then I found that my code was not very clean. So I refactored it.

```bash
git commit -m “refactor”
```

- And then, I found some issues and fixed them. Suddenly, I have to go home for some private business, then I decided to commit my work temporarily.

```bash
git commit -m “temp”
```

- OK! I completed the “ListItem” component.

```bash
git commit -m “completed the ListItem”
```

- I completed the “List” component and with the ListItem I committed above. Now I can make a final commit to mark that I finished my task.

```bash
git commit -m “finished task”
```

Looking back at the commit history, we see the history of the feature we are working on is lacks meaningful descriptions of changes and in general is messy.


# Clean commit history
## Squash & Reword

- **Squash**: combine commits into 1 commit.
- **Reword**: Edit the commit message.

In order to do that, here is the steps:

**1 - Open the commit history**

```bash
git log --oneline
```


![git log --oneline](https://miro.medium.com/max/1992/1*dYl9yK_dGMeCMOLbeJdPgg.png)


**2 - Identify how many commits we need to squash and reword**

![git log --oneline](https://miro.medium.com/max/1992/1*5tnNides06EgXpO_zdg9yA.png)

In this case, we are going to squash 5 commits in the “red box” and reword the 5th commit message.

**3 - Rebase to the commit just before the list of commits that you want to squash and reword**

*3.1 - Rebase to commit*

In this case, it is the sixth commit. Copy the hash string “7c63b5f” and rebase to 6th commit by:

```bash
git rebase -i 7c63b5f
```

*3.2 - Select options to modify commits*

After running the command at previous step, it takes us to Vim screen.

![Select options to modify commits](https://miro.medium.com/max/2460/1*k5fc4EY_Tp0g0bb1wjHohA.png)


So here is what we are doing:

- We replace the “pick” with “s” to commits in the “red box” to squash.
- We replace the “pick” with “r” to commits in the “yellow box” to reword commit message.

To modify Vim screen, you need to do 2 things:

- Enter the “Insert mode” by press “i” for editing.
- Enter the “Command mode” by press “esc” and press “:wq” to save the changes.

```bash
r 1e857cc add the ui of ListItem
s cb0cc38 refactor
s 4a1d911 temp
s 00cde97 completed the ListItem
s 975b990 finished task
```

*3.3 - Reword commit message*

After modifying the commits, it takes us to the reword screen.

![Reword commit message - before](https://miro.medium.com/max/1492/1*Q646xpewLzd6jEEECeqa6g.png)

Because we develop 2 components “List” & “List Item”. So the message should contains 2 components

Change:

> add the ui of ListItem

To:

> Add List & ListItem components

![Reword commit message - after](https://miro.medium.com/max/1456/1*7d_LryazE3vGEj8ncRIbiA.png)

Then “:wq” (Write & Quit) Vim.

*3.4 - Squash commits*

After we done editing the commit message. It takes us to the second screen to squash commits.

![Squash commits - before](https://miro.medium.com/max/1408/1*Wh_52l6CgfyVVoN8om-Uwg.png)

- Delete all lines in the “red box”.
- Keep the line in the “green box”. Because this is the final commit message reflects to our work.

To delete lines in the “red box”.

- Move your cursor to that line and press “dd”.

![Squash commits - after](https://miro.medium.com/max/1360/1*hZZkNKqvRuAHlOHuxIfUcQ.png)

- Then “:wq” (Write & Quit) Vim. Done!

*3.5 - Check if our work was successful or not*

```bash
git log --oneline
```

![Checking](https://miro.medium.com/max/1204/1*c5EhxjWsQeOse9MHM6tmBg.png)

As you can see, we already combined 5 commits into 1 and reworded the commit message.

## Merge base & Reset

After squashing commits, I create a PR (Pull Request or Merge Request) and add reviewers. And they give me feedback.

> What do you think about splitting the commit into 2 commits? Because 2 components should correspond to 2 commits. One for ListItem component, the other for List component.

Our mission now is:
- Splitting the squashed commit into 2 different commits.
- Each commit needs to have its own commit message.

Therefore, this section uses the second technique to re-commit and it requires a few steps:

1. Using “**git merge-base <branch A> <branch B>**” to get the common ancestors between the main branch and feature branch. The output of this is a hash string represent the commit.
2. Using “**git reset <commit>**” to go back when we haven’t committed anything related to List & ListItem components.
3. Using “**git add <file>**” to add files which belong to “**List**” component.
4. Commit the “**List**” component with the message “Add List component”.
5. Using “git add <file>” to add files which belong to “ListItem” component.
6. Commit the “**ListItem**” component with the message “Add ListItem component”.

**Using merge-base**

The first thing we need to do is find the most common parts between the main branch and feature branch by running the command below:

```bash
git merge-base master features/add-list-list-item
```

And the output is the hash string points to the commit has the most common parts between 2 branches:

```bash
7c63b5ffc4ba24581b624e298dd15a02d52bf2a7
```

Make sure you copy this hash string before moving to the next step.

**Reset commit**

In this step, we use the “git reset <commit>” with the hash string from the previous step to go back to the moment before we made any commits.

```bash
git reset 7c63b5ffc4ba24581b624e298dd15a02d52bf2a7
```

![Reset commit](https://miro.medium.com/max/2844/1*6zpUrQynDEv215vv0x1u1Q.png)

As you can see in the “orange box”, our files were back to the original state. Now we can use “git add <file>” to shape our commit.

**Finish move**

So we will create 2 commits which correspond to 2 components “List” & “ListItem”.

- List: “Add List component”

```bash
git add src/components/list/index.js
git add src/components/list/style.css
git commit -m "Add List component"
```

- List Item: “Add List Item component”

```bash
git add src/components/list-item/index.js
git add src/components/list-item/style.css
git commit -m "Add List Item component"
```

Done! Now to check whether or not we successfully re-shaped our commit. Just open the git commit history.

![Finish move](https://miro.medium.com/max/2428/1*HsFCCixf0u_3Qba9_bVtBQ.png)

## Amend

After we shaped our commits. Suddenly, we forgot we haven’t update document. So we went back and updated the document and this one is just a small change. You will ask yourself the question?

> Is there anyway that I commit and don’t have to shape the commits again?

Yes, we have. It’s `git commit --amend`.

What is git `commit --amend`?

The git commit --amend command is a convenient way to modify the most recent commit.

**How we use that?**

We updated the document of the source code and commit with the `--amend` flag.

```bash
git commit --amend
```

It takes you to Vim screen like this

![amend](https://miro.medium.com/max/2216/1*iPn0JkwoGViG8oQaCI08Ug.png)

Then “:wq” (Write & Quit) Vim. Done!

Now your changes were included in the last commit “Add List Item component”.

## Push force

After we finished everything and now we have the nice commits structure. The last thing we need to do is “push” code to remote branch.

If your branch is already in “**remote branch**” and you just rewrite commit history. Therefore, you need to override it in the “remote branch”.

```bash
git push -f
```

Otherwise

```bash
git push --set-upstream origin features/add-list-list-item
```

# Conclusion

Having the clean git history in your project is important. Especially, when you are working in the large team (≥ 20 contributors) in which everyday there is a bunch of commits are made. It helps you easy to catch up what’s going on, easy to revert and makes your life easier. But it comes with a price, if you apply it without any experience in the real project, it can cause you some trouble.

> Make sure you have tried it in your personal projects multiple times before applying it to the real project.

# References

- [https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
- [https://www.atlassian.com/git/tutorials/rewriting-history](https://www.atlassian.com/git/tutorials/rewriting-history)
