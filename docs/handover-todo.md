# HandLine Handover - Action Checklist

## Service Access & Transfers

- [x] **Supabase**: Add Luca as owner, share API keys, verify access to database and storage buckets
- [x] **Firebase**: Add Luca as owner, create admin account for enquiries@handlineco.com, share service account key
- [x] **Vercel**: Transfer ownership or add Luca with full access, verify env vars and deployment access
- [x] **GitHub**: Add Luca as admin collaborator or transfer ownership, verify push access
- [x] **Resend**: Add Luca to account or transfer ownership, verify API key and domain access
- [x] **Aruba**: Luca already has access

---

## Code Updates

- [x] Update `/pages/api/admin/reset-password.ts` line 27 to accept enquiries@handlineco.com as admin
- [x] Search codebase for jackoliverdev@gmail.com and update all hardcoded admin checks
- [x] Test Luca can log in to admin dashboard at handlineco.com/admin
- [ ] Verify all environment variables set correctly in Vercel production (handoverenv.md has all values)

---

## Documentation

- [x] Create shared Google Sheets bug tracker with "Bugs" and "Improvements" tabs
- [x] Add first bug: PPE Hub markdown editor line break issue
- [x] Schedule 1-hour walkthrough call with Luca (Wednesday 1:30pm)

---

## Testing

- [ ] Test Luca can log in to admin dashboard
- [ ] Test Luca can create a blog post and upload images
- [ ] Test Luca can trigger a Vercel deployment
- [ ] Test contact form goes to enquiries@handlineco.com
- [ ] Test job application goes to enquiries@handlineco.com

---

## Final Steps

- [ ] Remove jackoliverdev@gmail.com from all email "to" arrays (keep only enquiries@handlineco.com)
- [ ] Final code review - remove all personal info
- [ ] Confirm Luca comfortable with all systems
- [ ] Share completed handover.md document with all credentials filled in
- [ ] Archive project notes and send final invoice

---

## Emergency Contacts

**Developer**: Jack Melluish  
**Email**: jackoliverdev@gmail.com  
**Available for**: Bug fixes, improvement estimates, consultation

---

*Checklist Version: 1.0*  
*Created: 16/11/2025*

