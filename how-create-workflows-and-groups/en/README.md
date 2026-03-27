# AEM Workflow: Fix "Failed to load workitem information" & "Participant not found"

## Problem

When starting a custom workflow in AEM Author and clicking the **Complete** button in the page editor toolbar, the following error appears:

> **Failed to load workitem information. The selected item may no longer be available.**

In the AEM logs (`error.log`), the stack trace shows:

```
com.adobe.granite.workflow.WorkflowException: No Authorizable with ID null
    at com.adobe.granite.workflow.core.util.SecurityUtil.getAuthorizable(SecurityUtil.java:49)
    at com.adobe.granite.workflow.core.jcr.WorkItemManager.getRoutes(WorkItemManager.java:817)
    at com.adobe.granite.workflow.core.WorkflowSessionImpl.getRoutes(WorkflowSessionImpl.java:1078)
```

Additionally, when trying to **Sync** the workflow model in the model editor, each step shows a red box with **"Participant not found"**.

---

## Root Cause

The workflow model contains **Participant Steps** that reference user groups (e.g. `my_user_approver`) in their `PARTICIPANT` metadata property, but **those groups don't exist** in the AEM user/group system.

Because AEM can't resolve the participant, it returns `null`, which causes the `No Authorizable with ID null` exception.

### Example of a Participant Step in the workflow XML:

```xml
<node3
    jcr:primaryType="cq:WorkflowNode"
    title="Title name..."
    type="PARTICIPANT">
    <metaData
        jcr:primaryType="nt:unstructured"
        PARTICIPANT="my_user_approver"/>
</node3>
```

If the group `my_user_approver` doesn't exist → AEM resolves it as `null` → workflow breaks.

---

## Solution

### Step 1: Identify all required groups

Review your workflow model XMLs and find every unique value in `PARTICIPANT` properties. For example:

- `my_user_approver`

### Step 2: Create the groups in AEM

Go to the groups console:

```
http://localhost:4502/libs/granite/security/content/v2/groupeditor.html
```

Or the classic UI:

```
http://localhost:4502/security/groups.html
```

Click **Create** and fill in the form for each group:

| ID (must match XML exactly) | Name              | Description                          |
|-----------------------------|-------------------|--------------------------------------|
| `my_user_approver`          | Approver   | Approvers for the workflow       |

> **Important:** The **ID** must be exactly the same as in the XML (lowercase, underscores). The Name and Description are just display labels.

### Step 3: Add your user to the groups

Open each group and go to the **Members** tab. Add your user:

- For local development (`localhost:4502`): add the `admin` user.
- For other environments: add the appropriate users or groups.

### Step 4: Sync the workflow model

Go to the workflow model editor:

```
http://localhost:4502/libs/cq/workflow/admin/console/content/models.html
```

Select your workflow model and click **Sync**. The red "Participant not found" errors should now be gone.

### Step 5: Abort old workflow instances

Old instances that were started before the fix will remain broken. Abort them at:

```
http://localhost:4502/libs/cq/workflow/admin/console/content/instances.html
```

Find the active instances of your workflow and **terminate** them.

### Step 6: Restart the workflow

Start the workflow again on your page. The **Complete** button should now work correctly.

---

## Bonus: Design Model vs Runtime Model Desync

If you edit a workflow model but the changes don't seem to take effect, it might be because AEM maintains **two versions** of each workflow model:

- **Design model** (`/conf/...` or `/etc/workflow/models/...`): what you edit in the UI.
- **Runtime model** (`/var/workflow/models/...`): what AEM actually uses to run instances.

If these get out of sync, you may see inconsistent `PARTICIPANT` values between them. The **Sync** action in the model editor forces the runtime model to regenerate from the design model.

You can inspect both in **CRXDE Lite** (`/crx/de/index.jsp`) to compare their properties.

---

## Quick Checklist

- [ ] All `PARTICIPANT` groups exist in AEM's group system
- [ ] Your user is a member of the relevant groups
- [ ] Workflow model is synced (no red errors in model editor)
- [ ] Old broken instances are aborted
- [ ] New workflow instance started fresh after the fix