import { NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";

import visitorModel from "../../../model/visitor";
export async function GET(req) {
  await connectDB();

  // 🍪 Check existing cookie
  const existingCookie = req.cookies.get("visitor_id");

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";

  let visitor;

  if (!existingCookie) {
    visitor = await visitorModel.findOne({ ip });
    if (visitor) {
      visitor.visitCount += 1;
      visitor.lastVisit = new Date();
      await visitor.save();
    } else {
      visitor = await visitorModel.create({ ip });
    }
  }

  const totalVisitsAgg = await visitorModel.aggregate([
    { $group: { _id: null, total: { $sum: "$visitCount" } } },
  ]);

  const uniqueVisitors = await visitorModel.countDocuments();

  const response = NextResponse.json({
    totalVisits: totalVisitsAgg[0]?.total || 0,
    uniqueVisitors,
  });

  // 🍪 Set cookie (7 days valid)
  if (!existingCookie) {
    response.cookies.set("visitor_id", ip, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  return response;
}