USE [ReParrot]
GO

/****** Object:  StoredProcedure [dbo].[Services_SelectByOrgId_NoPag]    Script Date: 1/31/2023 6:52:45 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Seong Gwon
-- Create date: 1/30/2023
-- Description: Selects a un-paginated list of services by orgId
-- Code Reviewer: Liliana Meriweather

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[Services_SelectByOrgId_NoPag]

			@OrgId int

/*--------------------- TEST ------------------------

	Declare @OrgId int = 1

	Execute [dbo].[Services_SelectByOrgId_NoPag] @OrgId

*/


as


BEGIN

	SELECT	s.Id
			,s.Name
			,s.SKU
			,s.Description
			,s.OrganizationId
			,o.Name as Organization
			,st.Id as ServiceTypeId
			,st.Name as ServiceTypeName
			,ut.Id as UnitTypeId
			,ut.Name as UnitTypeName
			,s.UnitCost
			,s.EstimatedDuration
			,u.Id as CreatedById
			,u.FirstName
			,u.Mi
			,u.LastName
			,u.AvatarUrl
			,u.Id as ModifiedBy
			,u.FirstName
			,u.Mi
			,u.LastName
			,u.AvatarUrl

	FROM [dbo].[Services] as s
	INNER JOIN dbo.Organizations as o
		ON s.OrganizationId = o.Id
	INNER JOIN dbo.ServiceTypes as st
		ON s.ServiceTypeId = st.Id
	INNER JOIN dbo.UnitTypes as ut
		ON s.UnitTypeId = ut.Id
	INNER JOIN dbo.Users as u
		ON s.CreatedBy = u.Id
	
	WHERE s.OrganizationId = @OrgId AND s.isDeleted = 0

END
GO

