from fastapi import Request, APIRouter
#from controller.labs import get_hours
import os
from dotenv import load_dotenv
from supabase import create_client
load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)




router = APIRouter()


@router.get("/")
async def root():
    response = supabase.table('Usuario').select("*").execute()
    print(response)
    return response


#@router.get("/hours/{labid}")
#def hours(
#    request: Request,
#    labid: str,
#    sid: str
#):
#    return get_hours(
#        labid=labid,
#        sid = sid,
#    )