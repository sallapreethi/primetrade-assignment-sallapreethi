export const ok = (res: any, data: any, message = "OK") =>
  res.status(200).json({ success: true, message, data });

export const created = (res: any, data: any, message = "Created") =>
  res.status(201).json({ success: true, message, data });

export const badReq = (res: any, message = "Bad Request") =>
  res.status(400).json({ success: false, message });

export const unauthorized = (res: any, message = "Unauthorized") =>
  res.status(401).json({ success: false, message });

export const forbidden = (res: any, message = "Forbidden") =>
  res.status(403).json({ success: false, message });

export const notFound = (res: any, message = "Not Found") =>
  res.status(404).json({ success: false, message });P