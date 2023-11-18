using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data;
public class ApiDbContext : IdentityDbContext
{

    public ApiDbContext(DbContextOptions<ApiDbContext> dbContextOptions)
    : base(dbContextOptions)
    {

    }
}