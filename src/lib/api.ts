import { supabase } from './supabase';
import type { Professional, Job, ClientReview, ChatMessage, Review } from '../types';

// ------------------------------------------------
// TRANSFORMERS (DB snake_case ↔ App camelCase)
// ------------------------------------------------

function dbRowToProfessional(row: any, reviews: Review[] = []): Professional {
  return {
    id: row.id,
    name: row.name,
    avatar: row.avatar,
    bio: row.bio,
    phone: row.phone,
    email: row.email,
    rating: Number(row.rating),
    completedJobs: row.completed_jobs,
    hourlyRate: Number(row.hourly_rate),
    cleaningTypes: row.cleaning_types || [],
    location: row.location,
    experienceYears: row.experience_years,
    availability: row.availability || [],
    gender: row.gender || 'Outro',
    isVerified: row.is_verified,
    reviews,
  };
}

function dbRowToJob(row: any, chatMessages: ChatMessage[] = []): Job {
  return {
    id: row.id,
    title: row.title,
    clientName: row.client_name,
    clientType: row.client_type,
    phone: row.phone,
    email: row.email,
    description: row.description,
    cleaningType: row.cleaning_type,
    price: Number(row.price),
    date: row.date,
    time: row.time,
    durationHours: Number(row.duration_hours),
    address: row.address,
    sizeSqm: Number(row.size_sqm),
    status: row.status,
    applicants: row.applicants || [],
    assignedTo: row.assigned_to,
    extras: row.extras || [],
    createdAt: row.created_at,
    chatMessages,
  };
}

function dbRowToClientReview(row: any): ClientReview {
  return {
    id: row.id,
    clientName: row.client_name,
    reviewerName: row.reviewer_name,
    rating: Number(row.rating),
    comment: row.comment,
    date: row.date,
  };
}

// ------------------------------------------------
// PROFESSIONALS
// ------------------------------------------------

export async function fetchProfessionals(): Promise<Professional[]> {
  const { data: rows, error } = await supabase
    .from('professionals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!rows) return [];

  // Fetch all reviews for these professionals
  const proIds = rows.map((r: any) => r.id);
  const { data: reviewRows } = await supabase
    .from('professional_reviews')
    .select('*')
    .in('professional_id', proIds);

  const reviewsByProId: Record<string, Review[]> = {};
  if (reviewRows) {
    for (const r of reviewRows) {
      if (!reviewsByProId[r.professional_id]) reviewsByProId[r.professional_id] = [];
      reviewsByProId[r.professional_id].push({
        id: r.id,
        reviewerName: r.reviewer_name,
        rating: Number(r.rating),
        comment: r.comment,
        date: r.date,
      });
    }
  }

  return rows.map((row: any) =>
    dbRowToProfessional(row, reviewsByProId[row.id] || [])
  );
}

export async function insertProfessional(pro: Professional): Promise<void> {
  const { error } = await supabase.from('professionals').insert({
    id: pro.id,
    name: pro.name,
    avatar: pro.avatar,
    bio: pro.bio,
    phone: pro.phone,
    email: pro.email,
    rating: pro.rating,
    completed_jobs: pro.completedJobs,
    hourly_rate: pro.hourlyRate,
    cleaning_types: pro.cleaningTypes,
    location: pro.location,
    experience_years: pro.experienceYears,
    availability: pro.availability,
    gender: pro.gender,
    is_verified: pro.isVerified,
  });
  if (error) throw error;
}

export async function updateProfessional(
  id: string,
  updates: Partial<Professional>
): Promise<void> {
  const db: Record<string, any> = {};
  if (updates.completedJobs !== undefined) db.completed_jobs = updates.completedJobs;
  if (updates.rating !== undefined) db.rating = updates.rating;

  if (Object.keys(db).length === 0) return;
  const { error } = await supabase
    .from('professionals')
    .update(db)
    .eq('id', id);
  if (error) throw error;
}

// ------------------------------------------------
// PROFESSIONAL REVIEWS
// ------------------------------------------------

export async function insertProfessionalReview(
  professionalId: string,
  review: Review
): Promise<void> {
  const { error } = await supabase.from('professional_reviews').insert({
    professional_id: professionalId,
    reviewer_name: review.reviewerName,
    rating: review.rating,
    comment: review.comment,
    date: review.date,
  });
  if (error) throw error;
}

// ------------------------------------------------
// JOBS
// ------------------------------------------------

export async function fetchJobs(): Promise<Job[]> {
  const { data: rows, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!rows) return [];

  const jobIds = rows.map((r: any) => r.id);
  const { data: chatRows } = await supabase
    .from('chat_messages')
    .select('*')
    .in('job_id', jobIds)
    .order('timestamp', { ascending: true });

  const chatsByJobId: Record<string, ChatMessage[]> = {};
  if (chatRows) {
    for (const r of chatRows) {
      if (!chatsByJobId[r.job_id]) chatsByJobId[r.job_id] = [];
      chatsByJobId[r.job_id].push({
        id: r.id,
        sender: r.sender,
        senderName: r.sender_name,
        text: r.text,
        timestamp: r.timestamp,
      });
    }
  }

  return rows.map((row: any) =>
    dbRowToJob(row, chatsByJobId[row.id] || [])
  );
}

export async function insertJob(job: Job): Promise<void> {
  const { error } = await supabase.from('jobs').insert({
    id: job.id,
    title: job.title,
    client_name: job.clientName,
    client_type: job.clientType,
    phone: job.phone,
    email: job.email,
    description: job.description,
    cleaning_type: job.cleaningType,
    price: job.price,
    date: job.date,
    time: job.time,
    duration_hours: job.durationHours,
    address: job.address,
    size_sqm: job.sizeSqm,
    status: job.status,
    applicants: job.applicants,
    assigned_to: job.assignedTo,
    extras: job.extras || [],
    created_at: job.createdAt,
  });
  if (error) throw error;

  // Insert initial chat messages if any
  if (job.chatMessages && job.chatMessages.length > 0) {
    const chatRows = job.chatMessages.map((msg) => ({
      job_id: job.id,
      sender: msg.sender,
      sender_name: msg.senderName,
      text: msg.text,
      timestamp: msg.timestamp,
    }));
    const { error: chatError } = await supabase
      .from('chat_messages')
      .insert(chatRows);
    if (chatError) throw chatError;
  }
}

export async function updateJob(
  id: string,
  updates: Partial<Job>
): Promise<void> {
  const db: Record<string, any> = {};
  if (updates.applicants !== undefined) db.applicants = updates.applicants;
  if (updates.assignedTo !== undefined) db.assigned_to = updates.assignedTo;
  if (updates.status !== undefined) db.status = updates.status;

  if (Object.keys(db).length === 0) return;
  const { error } = await supabase.from('jobs').update(db).eq('id', id);
  if (error) throw error;
}

// ------------------------------------------------
// CHAT MESSAGES
// ------------------------------------------------

export async function insertChatMessage(
  jobId: string,
  msg: ChatMessage
): Promise<void> {
  const { error } = await supabase.from('chat_messages').insert({
    job_id: jobId,
    sender: msg.sender,
    sender_name: msg.senderName,
    text: msg.text,
    timestamp: msg.timestamp,
  });
  if (error) throw error;
}

// ------------------------------------------------
// CLIENT REVIEWS
// ------------------------------------------------

export async function fetchClientReviews(): Promise<ClientReview[]> {
  const { data: rows, error } = await supabase
    .from('client_reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (rows || []).map(dbRowToClientReview);
}

export async function insertClientReview(
  review: ClientReview
): Promise<void> {
  const { error } = await supabase.from('client_reviews').insert({
    client_name: review.clientName,
    reviewer_name: review.reviewerName,
    rating: review.rating,
    comment: review.comment,
    date: review.date,
  });
  if (error) throw error;
}

// ------------------------------------------------
// SEED: Insert initial data into empty tables
// ------------------------------------------------

export async function seedInitialData(
  professionals: Professional[],
  jobs: Job[],
  clientReviews: ClientReview[]
): Promise<void> {
  // Insert professionals
  for (const pro of professionals) {
    const { reviews, ...proData } = pro;
    const { error } = await supabase.from('professionals').upsert(
      {
        id: proData.id,
        name: proData.name,
        avatar: proData.avatar,
        bio: proData.bio,
        phone: proData.phone,
        email: proData.email,
        rating: proData.rating,
        completed_jobs: proData.completedJobs,
        hourly_rate: proData.hourlyRate,
        cleaning_types: proData.cleaningTypes,
        location: proData.location,
        experience_years: proData.experienceYears,
        availability: proData.availability,
        gender: proData.gender,
        is_verified: proData.isVerified,
      },
      { ignoreDuplicates: true }
    );
    if (error) throw error;

    // Insert professional reviews
    if (reviews.length > 0) {
      const reviewRows = reviews.map((r) => ({
        professional_id: proData.id,
        reviewer_name: r.reviewerName,
        rating: r.rating,
        comment: r.comment,
        date: r.date,
      }));
      const { error: rError } = await supabase
        .from('professional_reviews')
        .upsert(reviewRows, { ignoreDuplicates: true });
      if (rError) throw rError;
    }
  }

  // Insert jobs
  for (const job of jobs) {
    const { chatMessages, ...jobData } = job;
    const { error } = await supabase.from('jobs').upsert(
      {
        id: jobData.id,
        title: jobData.title,
        client_name: jobData.clientName,
        client_type: jobData.clientType,
        phone: jobData.phone,
        email: jobData.email,
        description: jobData.description,
        cleaning_type: jobData.cleaningType,
        price: jobData.price,
        date: jobData.date,
        time: jobData.time,
        duration_hours: jobData.durationHours,
        address: jobData.address,
        size_sqm: jobData.sizeSqm,
        status: jobData.status,
        applicants: jobData.applicants,
        assigned_to: jobData.assignedTo,
        extras: jobData.extras || [],
        created_at: jobData.createdAt,
      },
      { ignoreDuplicates: true }
    );
    if (error) throw error;

    // Insert chat messages
    if (chatMessages.length > 0) {
      const chatRows = chatMessages.map((msg) => ({
        job_id: jobData.id,
        sender: msg.sender,
        sender_name: msg.senderName,
        text: msg.text,
        timestamp: msg.timestamp,
      }));
      const { error: cError } = await supabase
        .from('chat_messages')
        .upsert(chatRows, { ignoreDuplicates: true });
      if (cError) throw cError;
    }
  }

  // Insert client reviews
  for (const review of clientReviews) {
    const { error } = await supabase.from('client_reviews').upsert(
      {
        client_name: review.clientName,
        reviewer_name: review.reviewerName,
        rating: review.rating,
        comment: review.comment,
        date: review.date,
      },
      { ignoreDuplicates: true }
    );
    if (error) throw error;
  }
}
